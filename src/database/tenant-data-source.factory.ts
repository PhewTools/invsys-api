import { DataSource } from 'typeorm';
/**
 * Creates a TypeORM DataSource scoped to a specific tenant schema.
 * Uses the same master database but sets the search_path to the tenant schema.
 */
export const createTenantDataSource = async (
  schemaName: string,
  synchronize: boolean = false,
): Promise<DataSource> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    schema: schemaName,
    synchronize: synchronize,
    logging: true,
    entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*.migration{.ts,.js}']
  });
  await dataSource.initialize();
  return dataSource;
};
