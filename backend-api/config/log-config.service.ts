import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogConfigService {
  constructor(private configService: ConfigService) {}

  get logLevel(): number {
    const env = this.configService.get<string>('NODE_ENV') || 'development';

    const logLevels = {
      development: 3, // Debug
      production: 5, // Warn
    };
    return logLevels[env];
  }
}
