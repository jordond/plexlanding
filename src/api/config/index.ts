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

export async function config(
  env: string = DEFAULT_ENV
): Promise<IServerConfig> {
  const defaultConfig: IServerConfig = defaults(env);
  const readConfig = await read(CONFIG_PATH);

  return Promise.resolve(merge({}, defaultConfig, readConfig));
}

interface IConfigFactory {
  save: (newConfig: IServerConfig) => Promise<boolean>;
  load: (force?: boolean) => Promise<IServerConfig>;
  all: () => IServerConfig;
}
export function configFactory(env: string = DEFAULT_ENV): IConfigFactory {
  let loadedConfig: IServerConfig = {};
  return {
    save: (newConfig: IServerConfig) => save(CONFIG_PATH, newConfig),
    load: async (force?: boolean) => {
      if (!Object.keys(loadedConfig).length || force) {
        loadedConfig = await config(env);
      }
      return loadedConfig;
    },
    all: () => loadedConfig
  };
}
