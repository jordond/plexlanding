import * as merge from "deep-extend";

import defaultConfig, { IServerConfig } from "./defaults";
import getEnvConfig from "./environments";

export const defaults: IServerConfig = merge(
  getEnvConfig(defaultConfig.env),
  defaultConfig
);
