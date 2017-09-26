import { LogLevel } from "../logger/logger.interface";
import { IServerConfig } from "./defaults";

export const ENVIRONMENT_DEV: string = "development";
export const ENVIRONMENT_PROD: string = "production";
export const ENVIRONMENT_TEST: string = "test";

export const ENVIRONMENTS: string[] = [
  ENVIRONMENT_DEV,
  ENVIRONMENT_PROD,
  ENVIRONMENT_TEST
];

export const devConfig: IServerConfig = {
  env: ENVIRONMENT_DEV,
  secureAPI: false,
  log: {
    filename: "server_dev.log",
    level: LogLevel.DEBUG
  }
};

export const prodConfig: IServerConfig = {
  env: ENVIRONMENT_PROD,
  secureAPI: true,
  log: {
    level: LogLevel.INFO
  }
};

export const testConfig: IServerConfig = {
  env: ENVIRONMENT_TEST,
  secureAPI: false,
  log: {
    silent: true
  }
};

export function getEnvironmentConfig(env: string): IServerConfig {
  return { devConfig, prodConfig, testConfig }[env] || { env: ENVIRONMENT_DEV };
}

export default getEnvironmentConfig;
