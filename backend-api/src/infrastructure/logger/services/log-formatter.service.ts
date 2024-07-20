import { Injectable } from '@nestjs/common';

@Injectable()
export class LogFormatterService {
  formatMessage(message: string, level: string, timestamp: string): string {
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  getLogLevelName(level: number): string {
    const logLevelNames: { [key: number]: string } = {
      7: 'Fatal',
      6: 'Error',
      5: 'Warn',
      4: 'Info',
      3: 'Debug',
      2: 'Trace',
      1: 'All',
    };
    return logLevelNames[level];
  }
}
