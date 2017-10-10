import { resolve } from "path";

import { ILogConfig, LogLevel } from "../logger/logger.interface";
import { ENVIRONMENT_DEV } from "./environments";

export interface IServerConfig {
  env?: string; // TODO consider making this an optional parameter, and checking for it where needed
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
export const DEFAULT_ENV: string = ENVIRONMENT_DEV;
export function defaultConfig(): IServerConfig {
  const root = resolve(__dirname, "../../../", "dist");
  const data: string = resolve(process.env.DATA_DIR || root, "data");
  const logFilePath: string = resolve(data, "plexlanding.log");

  // TODO ensure data directory exists

  return {
    title: "Plex Landing",
    env: process.env.NODE_ENV || DEFAULT_ENV,
    port: parseInt(process.env.PORT || "") || DEFAULT_SERVER_PORT,
    paths: {
      root,
      data
    },
    isDocker: Boolean(process.env.IS_DOCKER) || false,
    secureAPI: false,
    baseURL: "",
    database: {}, // TODO
    log: {
      filename: logFilePath,
      default: LogLevel.INFO,
      level: LogLevel.INFO,
      maxSize: 50 * 1024
    }
  };
}

export default defaultConfig;
