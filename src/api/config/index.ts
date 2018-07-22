import { merge } from "lodash";
import { resolve } from "path";

import { ensureDir } from "fs-extra";
import {
  DEFAULT_ENV,
  defaultConfig as getDefaults,
  IServerConfig
} from "./defaults";
import { getEnvironmentConfig } from "./environments";
import { read, save } from "./user";

const CONFIG_PATH: string = resolve(
  defaults()!.paths!.data as string,
  "config.json"
);
export function defaults(forceEnv: string = ""): IServerConfig {
  const defaultConfig = getDefaults();
  const env: string = forceEnv || (defaultConfig.env as any);
  return merge({}, defaultConfig, getEnvironmentConfig(env));
}

let cachedConfig: IServerConfig = {};
export async function user(
  env: string = DEFAULT_ENV,
  forceRead: boolean = false
): Promise<IServerConfig> {
  if (!Object.keys(cachedConfig).length || forceRead) {
    const defaultConfig: IServerConfig = defaults(env);
    const readConfig = await read(CONFIG_PATH);
    cachedConfig = merge({}, defaultConfig, readConfig);
  }

  await ensureDir(cachedConfig!.paths!.data as string);

  return Promise.resolve(cachedConfig);
}

interface IConfigFactory {
  save: (newConfig: IServerConfig) => Promise<boolean>;
  get: (force?: boolean) => Promise<IServerConfig>;
  all: () => IServerConfig;
}

/* tslint:disable-next-line:function-name */
export function Config(overrideEnv?: string): IConfigFactory {
  const env: string = overrideEnv || getDefaults().env || DEFAULT_ENV;
  return {
    save: (newConfig: IServerConfig) => save(CONFIG_PATH, newConfig),
    get: async (force?: boolean) => user(env, force),
    all: () => cachedConfig
  };
}
