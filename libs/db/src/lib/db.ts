import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { getPostgresDBCredentials } from './utils';

const queryClient = postgres(getPostgresDBCredentials());
export const db = drizzle(queryClient, { schema });
