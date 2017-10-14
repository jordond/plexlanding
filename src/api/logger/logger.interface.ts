export interface ILogConfig {
  filepath?: string;
  level?: LogLevel;
  maxSize?: number;
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

export const DEFAULT_LOG_LEVEL: LogLevel = LogLevel.INFO;
