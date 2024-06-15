import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { getPostgresDBCredentials } from './utils';

// export const db = drizzle(sql, { schema });
// for query purposes
const queryClient = postgres(getPostgresDBCredentials());
export const db = drizzle(queryClient, { schema });
