import { db } from '../db';
import type { InsertUserAnimalSchema } from '../schemas';
import { animals } from '../schemas';
import {
  animalPhotos,
  type InsertAnimalPhotosSchema,
} from '../schemas/animalPhotos';

export type Photo = Pick<InsertAnimalPhotosSchema, 'key'>;

export const getUserAnimals = (ownerId: string) => {
  return db.query.animals.findMany({
    where: ({ userId }, { eq }) => eq(userId, ownerId),
    with: {
      category: true,
      photos: true,
    },
  });
};

export const createUserAnimal = (
  animal: InsertUserAnimalSchema,
  photos: Photo[],
  userId: string
) => {
  // create an animal
  // if any photos were provided insert photos with reference to the animal
  // check how to insert smth when it has many to many relations
  // db.insert(animals).values(insertValue).returning();
  db.transaction(async (tx) => {
    try {
      const [createdAnimal] = await tx
        .insert(animals)
        .values({
          ...animal,
          userId,
        })
        .returning();

      if (photos.length > 0) {
        const photosToInsert: Omit<InsertAnimalPhotosSchema, 'id'>[] =
          photos.map((photo) => ({
            key: photo.key,
            animalId: createdAnimal.id,
          }));
        await tx.insert(animalPhotos).values(photosToInsert).returning({
          id: animalPhotos.id,
          key: animalPhotos.key,
        });
      }

      await tx.query.animals.findFirst({
        where: ({ id }, { eq }) => eq(id, createdAnimal.id),
        with: {
          category: true,
          photos: true,
        },
      });
    } catch (insertError) {
      console.error('Error during insert:', insertError);
      throw insertError;
    }
  });
};
