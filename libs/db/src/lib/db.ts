import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schemas';

const queryClient = neon(process?.env?.['DATABASE_URL'] as string);
export const db = drizzle(queryClient, {
  schema,
});
