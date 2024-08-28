import type { InferSelectModel } from 'drizzle-orm';
import { db } from './db';
import { user } from './userSchema';

type SelectUser = InferSelectModel<typeof user>;

export function findUserByEmail(
  email: string,
  withPassword?: true
): Promise<SelectUser | undefined>;
export function findUserByEmail(
  email: string,
  withPassword?: false
): Promise<Omit<SelectUser, 'password'> | undefined>;
export function findUserByEmail(email: string, withPassword?: boolean) {
  return db.query.user.findFirst({
    ...(!withPassword
      ? {
          columns: {
            password: false,
          },
        }
      : {}),
    where: (user, { eq }) => eq(user.email, email),
  });
}

export function findUserById(id: string) {
  return db.query.user.findFirst({
    columns: {
      password: false,
    },
    where: (user, { eq }) => eq(user.id, id),
  });
}

export async function createUser(insertValue: {
  email: string;
  password: string;
}) {
  return db.insert(user).values(insertValue).returning();
}
