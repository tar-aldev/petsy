import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import type { InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  image: text('image'),
  authUserId: text('auth_user_id').notNull(),
  country: text(),
  city: text(),
  preferredLanguage: text('preferred_language'),
});

export type InsertUser = InferInsertModel<typeof users>;
