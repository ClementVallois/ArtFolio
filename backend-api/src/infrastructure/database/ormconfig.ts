import path from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

const synchronizeEnabled = process.env.SYNCHRONIZE_ENABLED || 'false';
const loggingEnabled = process.env.LOGGING_ENABLED || 'false';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DB_API_PORT, 10) || 5432,
  username: process.env.DB_API_USER,
  password: process.env.DB_API_PASSWORD,
  database: process.env.DB_API_NAME,
  entities: [path.join(__dirname, '../../../**/domain/**/*.entity{.ts,.js}')],
  synchronize: synchronizeEnabled === 'true' ? true : false,
  logging: loggingEnabled === 'true' ? true : false,
  migrationsRun: false,
  migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
});
