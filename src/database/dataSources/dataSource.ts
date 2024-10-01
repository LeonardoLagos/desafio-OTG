import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/database/entities/*.js'],
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: true,
  migrationsTableName: '_migrations',
  logging: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
