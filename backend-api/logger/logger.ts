import { Injectable } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { LogConfigService } from 'config/log-config.service';

@Injectable()
export class Logger implements ILogger {
  constructor(private readonly logConfigService: LogConfigService) {}

  log(message: string, level: number): void {
    if (level >= this.logConfigService.logLevel) {
      console.log(`[${this.getLogLevelName(level).toUpperCase()}] ${message}`);
    }
  }

  error(message: string, error: any, level: number = 6): void {
    this.log(message, level);
    if (error) {
      console.error(error);
    }
  }

  warn(message: string, level: number = 5): void {
    this.log(message, level);
  }

  info(message: string, level: number = 4): void {
    this.log(message, level);
  }

  debug(message: string, level: number = 3): void {
    this.log(message, level);
  }

  trace(message: string, level: number = 2): void {
    this.log(message, level);
  }

  private getLogLevelName(level: number): string {
    const logLevelNames = {
      7: 'Fatal',
      6: 'Error',
      5: 'Warn',
      4: 'Info',
      3: 'Debug',
      2: 'Trace',
      1: 'All',
    };
    return logLevelNames[level] || 'Unknown';
  }
}
