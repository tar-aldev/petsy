export const getPostgresDBCredentials = () => {
  return {
    database: 'petsy',
    host: process.env['POSTGRES_HOST'],
    port: 5432,
    user: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
  };
};
