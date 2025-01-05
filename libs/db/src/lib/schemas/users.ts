import { pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import type { InferInsertModel } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    email: text('email').unique(),
    image: text('image'),
    authUserId: text('auth_user_id').notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  }
);

export type InsertUser = InferInsertModel<typeof users>;
