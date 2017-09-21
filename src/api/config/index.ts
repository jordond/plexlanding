import * as merge from "deep-extend";

import { defaultConfig as getDefaults, IServerConfig } from "./defaults";
import { getEnvironmentConfig } from "./environments";

const defaultConfig: IServerConfig = getDefaults();

export const defaults: IServerConfig = merge(
  getEnvironmentConfig(defaultConfig.env),
  defaultConfig
);
