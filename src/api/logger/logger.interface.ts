export interface ILogConfig {
  filename?: string;
  maxSize?: string;
  level?: LogLevel;
  default?: LogLevel;
  silent?: boolean;
}

export enum LogLevel {
  FATAL = 0,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE
}

export const logLevels: LogLevel[] = [
  LogLevel.FATAL,
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.INFO,
  LogLevel.DEBUG,
  LogLevel.TRACE
];
