import { defineConfig } from 'drizzle-kit';
import { getPostgresDBCredentials } from './utils';
import path from 'path';

export default defineConfig({
  schema: path.relative(process.cwd(), path.resolve(__dirname, 'schema.ts')),
  out: path.relative(process.cwd(), path.resolve(__dirname, 'drizzle')),
  dialect: 'postgresql',
  dbCredentials: getPostgresDBCredentials(),
});
