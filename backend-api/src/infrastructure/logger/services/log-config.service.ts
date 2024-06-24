import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '../log-level.enum';

@Injectable()
export class LogConfigService {
  constructor(private readonly configService: ConfigService) {}

  get logLevel(): LogLevel {
    const env = this.configService.get<string>('NODE_ENV') || 'development';
    const logLevels: { [key: string]: LogLevel } = {
      development: LogLevel.DEBUG,
      production: LogLevel.WARN,
    };
    return logLevels[env];
  }
}
