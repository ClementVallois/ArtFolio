import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatasourceProvider implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const synchronizeEnabled =
      this.configService.get<string>('DB_API_SYNCHRONIZE');
    const loggingEnable = this.configService.get<string>('DB_API_LOGGING');

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_API_HOST'),
      port: this.configService.get<number>('DB_API_PORT'),
      username: this.configService.get<string>('DB_API_USER'),
      password: this.configService.get<string>('DB_API_PASSWORD'),
      database: this.configService.get<string>('DB_API_NAME'),
      entities: [__dirname + '../../../**/domain/**/*.entity{.ts,.js}'],
      synchronize: synchronizeEnabled === 'true' ? true : false,
      logging: loggingEnable === 'true' ? true : false,
      migrationsRun: false,
      migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
