import type { InferSelectModel } from 'drizzle-orm';
import { db } from './db';
import { users } from './usersSchema';

type SelectUser = InferSelectModel<typeof users>;

export function findUserByEmail(
  email: string,
  withPassword?: true
): Promise<SelectUser | undefined>;
export function findUserByEmail(
  email: string,
  withPassword?: false
): Promise<Omit<SelectUser, 'password'> | undefined>;
export function findUserByEmail(email: string, withPassword?: boolean) {
  return db.query.users.findFirst({
    ...(!withPassword
      ? {
          columns: {
            password: false,
          },
        }
      : {}),
    where: (users, { eq }) => eq(users.email, email),
  });
}

export function findUserById(id: string) {
  return db.query.users.findFirst({
    columns: {
      password: false,
    },
    where: (users, { eq }) => eq(users.id, id),
  });
}

export async function createUser(insertValue: {
  email: string;
  password: string;
}) {
  return db.insert(users).values(insertValue).returning();
}
