import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_API_HOST,
  port: Number(process.env.DB_API_PORT),
  username: 'admin',
  password: process.env.DB_API_PASSWORD,
  database: process.env.DB_API_NAME,
  entities: ['src/domain/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: true,
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
