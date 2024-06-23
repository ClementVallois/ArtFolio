import { Global, Module } from '@nestjs/common';
import { LogFileService } from './services/log-file.service';
import { LogConfigService } from './services/log-config.service';
import { Logger } from './services/logger.service';

@Global()
@Module({
  providers: [Logger, LogConfigService, LogFileService],
  exports: [Logger, LogConfigService, LogFileService],
})
export class LoggerModule {}
