import type { SelectUserAnimalSchema } from '@petsy/db';
import { Button, Card, CardContent } from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { differenceInYears } from 'date-fns';
import { ChevronRight, Pencil } from 'lucide-react';
import Link from 'next/link';

const getAnimalPhotoUrl = (photos: SelectUserAnimalSchema['photos']) => {
  if (!photos?.[0]) {
    return null;
  }

  return `https://utfs.io/f/${photos[0]?.key}`;
};

export function AnimalCard({
  animalData,
}: {
  animalData: SelectUserAnimalSchema;
}) {
  const photoUrl = getAnimalPhotoUrl(animalData.photos);

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="min-w-40 w-1/3">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Grey cat"
                className="max-h-40 w-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <Typography component="h2" variant="h3">
                  {animalData.name}
                </Typography>

                <Button size="icon" variant="link" asChild>
                  <Link href={`/user/profile/animals/${animalData.id}/edit`}>
                    <Pencil className="w-6 h-6" />
                  </Link>
                </Button>
              </div>

              {animalData.birthDate && (
                <Typography>
                  Age:{' '}
                  {differenceInYears(
                    new Date(),
                    new Date(animalData.birthDate)
                  )}{' '}
                  years
                </Typography>
              )}
            </div>
            <Button
              asChild
              variant="link"
              className="self-end"
              rightIcon={ChevronRight}
            >
              <Link href={`/user/profile/animals/${animalData.id}`}>
                Show more
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
