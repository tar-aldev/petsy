import { defineConfig } from 'drizzle-kit';
import path from 'path';
import { getDatabaseUrl } from './utils';

export default defineConfig({
  schema: path.relative(
    process.cwd(),
    path.resolve(__dirname, 'schemas/index.ts')
  ),
  out: path.relative(process.cwd(), path.resolve(__dirname, 'drizzle')),
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
