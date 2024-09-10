import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceProvider } from './datasource.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatasourceProvider,
    }),
  ],
})
export class DatabaseModule {}
