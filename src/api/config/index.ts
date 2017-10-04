import { merge } from "lodash";

import {
  DEFAULT_ENV,
  defaultConfig as getDefaults,
  IServerConfig
} from "./defaults";
import { getEnvironmentConfig } from "./environments";

export function defaults(env: string = ""): IServerConfig {
  const defaultConfig = getDefaults();
  return merge({}, defaultConfig, getEnvironmentConfig(env || DEFAULT_ENV));
}
