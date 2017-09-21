import { resolve } from "path";

import { ILogConfig } from "../logger/logger.interface";
import { ENVIRONMENT_DEV } from "./environments";

export interface IServerConfig {
  env: string;
  title?: string;
  port?: number;
  paths?: IServerPaths;
  isDocker?: boolean;
  secureAPI?: boolean;
  baseURL?: string;
  database?: IDatabaseConfig;
  log?: ILogConfig;
}

export interface IServerPaths {
  root?: string;
  data?: string;
}

// TODO Put this in the databse clase
export interface IDatabaseConfig {
  options?: object;
  name?: string;
  username?: string;
  password?: string;
  filename?: string;
  force?: boolean;
}

export const DEFAULT_SERVER_PORT: number = 9411;

export function defaultConfig(): IServerConfig {
  const root = resolve(__dirname, "../../../", "dist");
  const data: string = resolve(process.env.DATA_DIR || root, "data");

  return {
    title: "Plex Landing",
    env: process.env.NODE_ENV || ENVIRONMENT_DEV,
    port: parseInt(process.env.PORT || "") || DEFAULT_SERVER_PORT,
    paths: {
      root,
      data
    },
    isDocker: Boolean(process.env.IS_DOCKER) || false,
    secureAPI: false,
    baseURL: "",
    database: {}, // TODO
    log: {} // TODO
  };
}

export default defaultConfig;
