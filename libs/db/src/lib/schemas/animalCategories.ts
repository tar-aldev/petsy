import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const animalCategories = pgTable('animal_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug'),
});
