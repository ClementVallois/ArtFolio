export interface ILogger {
  log(message: string, level?: number): void;
  error(message: string, error: any, level: number): void;
  warn(message: string): void;
  info(message: string): void;
  debug(message: string): void;
}
