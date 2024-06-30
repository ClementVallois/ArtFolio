import { Injectable } from '@nestjs/common';
import { ILogger } from '../interfaces/logger.interface';
import { LogFileService } from './log-file.service';
import { LogConfigService } from './log-config.service';
import { LogFormatterService } from './log-formatter.service';
import * as path from 'path';
import { LogLevel } from '../log-level.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Logger implements ILogger {
  private readonly logDirectory: string;

  constructor(
    private readonly logConfigService: LogConfigService,
    private readonly logFileService: LogFileService,
    private readonly logFormatterService: LogFormatterService,
    private readonly configService: ConfigService,
  ) {
    this.logDirectory = this.configService.get<string>('LOG_DIRECTORY');
    this.logFileService.ensureDirectoryExists(this.logDirectory);
  }

  private getLogFilePath(): string {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(this.logDirectory, `app-${date}.log`);
  }

  async log(message: string, level: LogLevel): Promise<void> {
    if (level >= this.logConfigService.logLevel) {
      const timestamp = new Date().toISOString();
      const logMessage = this.logFormatterService.formatMessage(
        message,
        this.logFormatterService.getLogLevelName(level),
        timestamp,
      );
      await this.logFileService.appendToFile(
        this.getLogFilePath(),
        `${logMessage}\n`,
      );
    }
  }

  async error(
    message: string,
    error: any,
    level: LogLevel = LogLevel.ERROR,
  ): Promise<void> {
    await this.log(message, level);
    if (error) {
      await this.logFileService.appendToFile(
        this.getLogFilePath(),
        `${error.stack || error}\n`,
      );
    }
  }

  async warn(message: string, level: LogLevel = LogLevel.WARN): Promise<void> {
    await this.log(message, level);
  }

  async info(message: string, level: LogLevel = LogLevel.INFO): Promise<void> {
    await this.log(message, level);
  }

  async debug(
    message: string,
    level: LogLevel = LogLevel.DEBUG,
  ): Promise<void> {
    await this.log(message, level);
  }

  async trace(
    message: string,
    level: LogLevel = LogLevel.TRACE,
  ): Promise<void> {
    await this.log(message, level);
  }
}
