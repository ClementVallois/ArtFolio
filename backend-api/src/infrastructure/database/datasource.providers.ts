import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domain/user/user.entity';
import { Post } from 'src/domain/post/post.entity';
import { Asset } from 'src/domain/asset/asset.entity';
import { Category } from 'src/domain/category/category.entity';

@Injectable()
export class DatasourceProvider implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_API_HOST'),
      port: this.configService.get<number>('DB_API_PORT'),
      username: this.configService.get<string>('DB_API_USER'),
      password: this.configService.get<string>('DB_API_PASSWORD'),
      database: this.configService.get<string>('DB_API_NAME'),
      entities: [User, Post, Asset, Category],
      synchronize: true,
      logging: true,
      migrationsRun: true,
      migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    };
  }
}
