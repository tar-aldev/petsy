import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'user',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    email: text('email').unique().notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    password: text('password'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    image: text('image'),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  }
);
