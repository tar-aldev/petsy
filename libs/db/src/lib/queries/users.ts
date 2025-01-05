import type { InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import type { InsertUser } from '../schemas';
import { users } from '../schemas';

type SelectUser = InferSelectModel<typeof users>;

export function findUserByEmailForAuthorization(email: string) {
  return db.query.users.findFirst({
    with: {
      roleUser: {
        columns: {
          userId: false,
          roleId: false,
        },
        with: {
          role: true,
        },
      },
    },
    where: (user, { eq }) => eq(user.email, email),
  });
}

export function findUserByEmail(
  email: string
): Promise<Omit<SelectUser, 'password'> | undefined>;
export function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    columns: {
      password: false,
    },
    where: (user, { eq }) => eq(user.email, email),
  });
}

export function findUserById(id: string) {
  return db.query.users.findFirst({
    columns: {
      password: false,
    },
    where: (user, { eq }) => eq(user.id, id),
  });
}

export function findUserByIdWithRoles(id: string) {
  const base: Parameters<typeof db.query.users.findFirst>[0] = {
    columns: {
      password: false,
    },
    where: (user, { eq }) => eq(user.id, id),
  };

  return db.query.users.findFirst({
    ...base,
    with: {
      roleUser: {
        columns: {
          userId: false,
          roleId: false,
        },
        with: {
          role: true,
        },
      },
    },
  });
}

export async function createUser(insertValue: InsertUser) {
  return db.insert(users).values(insertValue).returning();
}

export async function createUserIfNotExists(insertValue: InsertUser) {
  return db
    .insert(users)
    .values(insertValue)
    .onConflictDoNothing({ target: users.authUserId })
    .returning();
}
