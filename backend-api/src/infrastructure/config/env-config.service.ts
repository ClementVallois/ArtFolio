import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/domain/config/database.interface';

// TODO : Use this service in the datasource provider
@Injectable()
export class EnvConfigService implements IDatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_API_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DB_API_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DB_API_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('DB_API_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DB_API_NAME');
  }
  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DB_API_SYNCHRONIZE');
  }
}
