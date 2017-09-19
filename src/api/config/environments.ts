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

export const development: IServerConfig = {
  env: ENVIRONMENT_DEV,
  secureAPI: false,
  log: {
    filename: "server_dev.log",
    level: LogLevel.DEBUG
  }
};

export const production: IServerConfig = {
  env: ENVIRONMENT_PROD,
  secureAPI: true,
  log: {
    level: LogLevel.INFO
  }
};

export const test: IServerConfig = {
  env: ENVIRONMENT_TEST,
  secureAPI: false,
  log: {
    silent: true
  }
};

export default function getEnvironmentConfig(env: string): IServerConfig {
  switch (env) {
    case ENVIRONMENT_DEV:
      return development;
    case ENVIRONMENT_PROD:
      return production;
    case ENVIRONMENT_TEST:
      return test;
  }
  return { env: ENVIRONMENT_DEV };
}
