import * as merge from "deep-extend";

import { defaultConfig as getDefaults, IServerConfig } from "./defaults";
import { getEnvironmentConfig } from "./environments";

export function defaults(env: string = ""): IServerConfig {
  const defaultConfig = getDefaults();
  return merge(getEnvironmentConfig(env || defaultConfig.env), defaultConfig);
}
