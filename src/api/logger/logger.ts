import {
  Logger as WinstonLogger,
  LoggerInstance,
  LoggerOptions,
  transports
} from "winston";

import { ILogConfig } from "./logger.interface";

const { Console, File } = transports;

let loggerInstance: LoggerInstance;
export function initLogger(config: ILogConfig): void {
  if (loggerInstance === undefined) {
    const { level, filename, silent = false, ...logConfig } = config;
    const loggerOptions: LoggerOptions = {
      level,
      exitOnError: true,
      handleExceptions: true,
      transports: [
        new Console({ silent, timestamp: true, colorize: true, json: false }),
        new File({
          filename,
          silent,
          timestamp: true,
          maxFiles: 5,
          json: true,
          ...logConfig
        })
      ]
    };
    loggerInstance = new WinstonLogger(loggerOptions);
  } else {
    loggerInstance.info("Logger was already initialized");
  }
}

export class Logger {
  private tag: string;
  constructor(tag?: string) {
    if (!loggerInstance) {
      throw new Error("Logger was not initalized, unable to create logger");
    }
    this.tag = tag || "App";
  }
  public error(msg: string, data: any): void {
    this.log("error", msg, data);
  }

  public warn(msg: string, data: any): void {
    this.log("warn", msg, data);
  }

  public info(msg: string, data: any): void {
    this.log("info", msg, data);
  }
  public verbose(msg: string, data: any): void {
    this.log("verbose", msg, data);
  }
  public debug(msg: string, data: any): void {
    this.log("debug", msg, data);
  }
  private log(level: string, msg: string, data: any) {
    loggerInstance.log(level, `[${this.tag}] ${msg}`, data);
  }
}
