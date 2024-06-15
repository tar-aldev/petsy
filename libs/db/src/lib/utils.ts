import { z } from 'zod';

const envVariablesSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
});

export const getPostgresDBCredentials = () => {
  const parsedVariables = envVariablesSchema.parse(process.env);
  const { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } = parsedVariables;

  return {
    database: 'petsy',
    host: POSTGRES_HOST,
    port: 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
};
