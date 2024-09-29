import { db } from '../db';

export async function getAnimalCategories({
  name = '',
  offset = 0,
  limit = 20,
}: {
  name?: string;
  offset?: number;
  limit?: number;
}) {
  const result = await db.query.animalCategories.findMany({
    orderBy: (animalCategory, { asc }) => asc(animalCategory.name),
    where: (animalCategory, { like }) => like(animalCategory.name, `%${name}%`),
    limit,
    offset,
  });

  return result;
}
