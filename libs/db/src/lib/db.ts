import * as schema from './schemas';

import { drizzle } from 'drizzle-orm/neon-serverless';
import { getPool } from './utils';

export const db = drizzle(getPool(), { schema });
