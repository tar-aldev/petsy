import { Pool, neonConfig } from '@neondatabase/serverless';
import { z } from 'zod';
import ws from 'ws';

const envVariablesSchema = z.object({
  // POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DB_PORT: z.string().transform((arg) => parseInt(arg)),
});

export const getPostgresDBCredentials = () => {
  const parsedVariables = envVariablesSchema.parse(process.env);
  const { /* POSTGRES_HOST,  */ POSTGRES_PASSWORD, POSTGRES_USER } =
    parsedVariables;

  return {
    database: 'petsy',
    // host: POSTGRES_HOST,
    // port: 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
};

export const getDatabaseUrl = () => {
  const parsedVariables = envVariablesSchema.parse(process.env);
  const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, DB_PORT } =
    parsedVariables;

  return process.env['VERCEL_ENV'] === 'development'
    ? `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${DB_PORT}/${POSTGRES_DB}`
    : process.env['DATABASE_URL']!;
};

/* 
  Get pool to be used with drizzle orm
  https://neon.tech/guides/local-development-with-neon#local-postgresql
  This allows to use db transactions
*/
export const getPool = () => {
  const connectionString = getDatabaseUrl();

  if (process.env?.['VERCEL_ENV'] === 'development') {
    // db.localtest.me
    // connectionString = databaseUrl'postgres://postgres:postgres@db.localtest.me:5432/main';
    neonConfig.fetchEndpoint = (host) => {
      const [protocol, port] =
        host === 'localhost' ? ['http', 4444] : ['https', 443];
      return `${protocol}://${host}:${port}/sql`;
    };
    const connectionStringUrl = new URL(connectionString);
    neonConfig.useSecureWebSocket =
      connectionStringUrl.hostname !== 'localhost';
    neonConfig.wsProxy = (host) => `${host}:4444/v1`;
    neonConfig.webSocketConstructor = ws;
  }

  return new Pool({ connectionString });
};
