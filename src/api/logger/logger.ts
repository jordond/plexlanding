import { Logger, LoggerInstance, LoggerOptions, transports } from "winston";

import { DEFAULT_LOG_LEVEL, ILogConfig } from "./logger.interface";

const { Console, File } = transports;

export const DEFAULT_FILEPATH: string = __dirname;

export function createLogger(
  {
    filename = DEFAULT_FILEPATH,
    level = DEFAULT_LOG_LEVEL,
    maxSize = 50 * 1024,
    silent = false
  }: ILogConfig = {},
  label: string = "App",
  handleExceptions: boolean = false
): LoggerInstance {
  const common: object = { level, silent, timestamp: true };
  const loggerOptions: LoggerOptions = {
    label,
    handleExceptions,
    exitOnError: handleExceptions,
    transports: [
      new Console({ ...common, colorize: true, json: false }),
      new File({
        ...common,
        maxSize,
        filename,
        maxFiles: 5,
        json: true
      })
    ]
  };

  return new Logger(loggerOptions);
}
