import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres-api',
  port: Number(process.env.DB_API_PORT),
  username: 'admin',
  password: process.env.DB_API_PASSWORD,
  database: process.env.DB_API_NAME,
  entities: [__dirname + '/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: true,
  migrationsRun: true,
};

const AppDataSource = new DataSource(dataSourceOptions);
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
