import { defineConfig } from 'drizzle-kit';
import { getPostgresDBCredentials } from './utils';

export default defineConfig({
  schema: `${__dirname}/schema.ts`,
  dialect: 'postgresql',
  // driver: 'pg',
  dbCredentials: getPostgresDBCredentials(),
});
