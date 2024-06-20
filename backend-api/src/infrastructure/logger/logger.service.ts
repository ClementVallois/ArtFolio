import { Injectable } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { LogConfigService } from 'config/log-config.service';
import * as path from 'path';
import { LogFileService } from './log-file.service';

@Injectable()
export class Logger implements ILogger {
  private readonly logFilePath: string;

  constructor(
    private readonly logConfigService: LogConfigService,
    private readonly logFileService: LogFileService,
  ) {
    this.logFilePath = path.join('logs', 'app.log');
    const logDir = path.join('logs');
    this.logFileService.ensureDirectoryExists(logDir);
  }

  async log(message: string, level: number): Promise<void> {
    if (level >= this.logConfigService.logLevel) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${this.getLogLevelName(level).toUpperCase()}] ${message}`;
      await this.logFileService.appendToFile(
        this.logFilePath,
        `${logMessage}\n`,
      );
    }
  }

  async error(message: string, error: any, level: number = 6): Promise<void> {
    await this.log(message, level);
    if (error) {
      await this.logFileService.appendToFile(this.logFilePath, `${error}\n`);
    }
  }

  async warn(message: string, level: number = 5): Promise<void> {
    await this.log(message, level);
  }

  async info(message: string, level: number = 4): Promise<void> {
    await this.log(message, level);
  }

  async debug(message: string, level: number = 3): Promise<void> {
    await this.log(message, level);
  }

  async trace(message: string, level: number = 2): Promise<void> {
    await this.log(message, level);
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

    return logLevelNames[level];
  }
}
