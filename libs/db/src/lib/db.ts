// import { drizzle } from 'drizzle-orm/neon-http';
import { neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { drizzle as drizzleT } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
import { Pool } from '@neondatabase/serverless';
import ws from 'ws';
import * as schema from './schemas';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process?.env?.['DATABASE_URL'] as string,
});

export const db = drizzle(pool, { schema });

// const queryClient = neon(process?.env?.['DATABASE_URL'] as string);

// export const db = drizzle(queryClient, {
//   schema,
// });
