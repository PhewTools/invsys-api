import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';

export default registerAs('masterDataSource', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'master_db',
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/master/*{.ts,.js}'],
}));
