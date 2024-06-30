import { LogLevel } from '../log-level.enum';

export interface ILogger {
  log(message: string, level?: LogLevel): void;
  error(message: string, error: any, level: LogLevel): void;
  warn(message: string, level: LogLevel): void;
  info(message: string, level: LogLevel): void;
  debug(message: string, level: LogLevel): void;
  trace(message: string, level: LogLevel): void;
}
