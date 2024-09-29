import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { animals } from './animals';

export const animalPhotos = pgTable('animal_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull(),
  animalId: uuid('animal_id')
    .notNull()
    .references(() => animals.id, { onDelete: 'cascade' }),
});

export const animalPhotosRelations = relations(animalPhotos, ({ one }) => ({
  animal: one(animals, {
    fields: [animalPhotos.animalId],
    references: [animals.id],
  }),
}));

export type InsertAnimalPhotosSchema = InferSelectModel<typeof animalPhotos>;
