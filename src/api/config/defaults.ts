import { join, resolve } from "path";

import { ILogConfig } from "../logger/logger.interface";

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

const root = resolve(join(__dirname, "../../../", "dist"));
const data: string = resolve(join(process.env.DATA_DIR || root, "data"));

const defaultConfig: IServerConfig = {
  title: "Plex Landing",
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "") || 9411,
  paths: {
    root,
    data
  },
  isDocker: false,
  secureAPI: false,
  baseURL: "",
  database: {}, // TODO
  log: {} // TODO
};

export default defaultConfig;
