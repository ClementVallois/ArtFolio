import { Injectable, Logger as NestLogger } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LogFileService {
  private readonly logger = new NestLogger(LogFileService.name);

  ensureDirectoryExists(directory: string): void {
    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
    } catch (error) {
      this.logger.error(
        `Failed to create directory: ${directory}`,
        error.stack,
      );
    }
  }

  async appendToFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.promises.appendFile(filePath, content);
    } catch (error) {
      this.logger.error(`Failed to write to file: ${filePath}`, error.stack);
    }
  }
}
