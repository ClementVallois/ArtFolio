import { Global, Module } from '@nestjs/common';
import { Logger } from './services/logger.service';
import { LogConfigService } from './services/log-config.service';
import { LogFileService } from './services/log-file.service';
import { LogFormatterService } from './services/log-formatter.service';

@Global()
@Module({
  providers: [Logger, LogConfigService, LogFileService, LogFormatterService],
  exports: [Logger, LogConfigService, LogFileService, LogFormatterService],
})
export class LoggerModule {}
