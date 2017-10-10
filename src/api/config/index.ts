import { merge } from "lodash";
import { resolve } from "path";

import {
  DEFAULT_ENV,
  defaultConfig as getDefaults,
  IServerConfig
} from "./defaults";
import { getEnvironmentConfig } from "./environments";
import { read, save } from "./user";

const CONFIG_PATH: string = resolve(defaults()!.paths!.data, "config.json");
export function defaults(env: string = ""): IServerConfig {
  const defaultConfig = getDefaults();
  return merge({}, defaultConfig, getEnvironmentConfig(env || DEFAULT_ENV));
}

let cachedConfig: IServerConfig = {};
export async function config(
  env: string = DEFAULT_ENV,
  forceRead: boolean = false
): Promise<IServerConfig> {
  if (!Object.keys(cachedConfig).length || forceRead) {
    const defaultConfig: IServerConfig = defaults(env);
    const readConfig = await read(CONFIG_PATH);
    cachedConfig = merge({}, defaultConfig, readConfig);
  }

  return Promise.resolve(cachedConfig);
}

interface IConfigFactory {
  save: (newConfig: IServerConfig) => Promise<boolean>;
  get: (force?: boolean) => Promise<IServerConfig>;
  all: () => IServerConfig;
}
export function configFactory(env: string = DEFAULT_ENV): IConfigFactory {
  return {
    save: (newConfig: IServerConfig) => save(CONFIG_PATH, newConfig),
    get: async (force?: boolean) => await config(env, force),
    all: () => cachedConfig
  };
}
