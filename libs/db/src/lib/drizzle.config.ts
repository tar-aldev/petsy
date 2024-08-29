import { defineConfig } from 'drizzle-kit';
import path from 'path';

export default defineConfig({
  schema: path.relative(
    process.cwd(),
    path.resolve(__dirname, 'schemas/index.ts')
  ),
  out: path.relative(process.cwd(), path.resolve(__dirname, 'drizzle')),
  dialect: 'postgresql',
  dbCredentials: {
    url: process?.env?.['DATABASE_URL'] as string,
  },
});
