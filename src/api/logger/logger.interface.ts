export interface ILogConfig {
  filename?: string;
  maxSize?: string;
  level?: LogLevel;
  default?: LogLevel;
  silent?: boolean;
}

export enum LogLevel {
  ERROR = 0,
  WARN,
  INFO,
  VERBOSE,
  DEBUG,
  SILLY
}

export const logLevels: LogLevel[] = [
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.INFO,
  LogLevel.VERBOSE,
  LogLevel.DEBUG,
  LogLevel.SILLY
];
