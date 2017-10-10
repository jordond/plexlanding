export interface ILogConfig {
  filename?: string;
  maxSize?: number;
  level?: LogLevel;
  default?: LogLevel;
  silent?: boolean;
}

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  VERBOSE = "verbose",
  DEBUG = "debug",
  SILLY = "silly"
}

export const logLevels: LogLevel[] = [
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.INFO,
  LogLevel.VERBOSE,
  LogLevel.DEBUG,
  LogLevel.SILLY
];
