import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { animalCategories } from './animalCategories';
import { animalPhotos } from './animalPhotos';
import { users } from './users';

export const animalGenderEnum = pgEnum('gender', ['Male', 'Female']);
export const animalState = pgEnum('state', [
  'Adopted',
  'HasOwner',
  'InShelter',
  'Hosted',
]);

export const sprayedOrNeutered = pgEnum('sprayed_or_neutered', [
  'yes',
  'no',
  'unknown',
]);

export const animals = pgTable('animals', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => animalCategories.id),
  userId: uuid('user_id').references(() => users.id),
  hostedByUserId: uuid('hosted_by_user_id').references(() => users.id),
  name: text('name').notNull(),
  breed: text('breed'),
  gender: animalGenderEnum('gender'),
  sprayedOrNeutered: sprayedOrNeutered('sprayed_or_neutered'),
  animalState: animalState('animal_state'),
  birthDate: timestamp('birth_date', { withTimezone: true }),
});

export const animalsRelations = relations(animals, ({ one, many }) => ({
  category: one(animalCategories, {
    fields: [animals.categoryId],
    references: [animalCategories.id],
  }),
  photos: many(animalPhotos),
}));

type AnimalPhoto = InferSelectModel<typeof animalPhotos>;
type AnimalCategory = InferSelectModel<typeof animalCategories>;

export type InsertUserAnimalSchema = InferInsertModel<typeof animals>;
export type SelectUserAnimalSchema = InferSelectModel<typeof animals> & {
  photos: AnimalPhoto[];
  category: AnimalCategory | null;
};
