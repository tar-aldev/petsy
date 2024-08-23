import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { getPostgresDBCredentials } from './utils';
import * as schema from './schema';

const queryClient = postgres(getPostgresDBCredentials());
export const db = drizzle(queryClient, {
  schema,
});
