import { Logger, Module } from '@nestjs/common';
import { LogConfigService } from 'config/log-config.service';
import { LogFileService } from './log-file.service';

@Module({
  providers: [Logger, LogConfigService, LogFileService],
  exports: [Logger, LogConfigService, LogFileService],
})
export class LoggerModule {}
