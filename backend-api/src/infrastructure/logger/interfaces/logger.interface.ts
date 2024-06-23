export interface ILogger {
  log(message: string, level?: number): void;
  error(message: string, error: any, level: number): void;
  warn(message: string, level: number): void;
  info(message: string, level: number): void;
  debug(message: string, level: number): void;
  trace(message: string, level: number): void;
}
