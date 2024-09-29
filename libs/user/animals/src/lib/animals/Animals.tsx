import { auth } from '@petsy/auth-config/server';
import { getUserAnimals } from '@petsy/db';
import { Button } from '@petsy/shadcn-components';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { AnimalCard } from './AnimalCard';

export async function Animals() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  const userAnimals = await getUserAnimals(session.user.id);

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4">
        {userAnimals.map((userAnimal) => (
          <AnimalCard key={userAnimal.id} animalData={userAnimal} />
        ))}

        <Link href="/user/add-animal">
          <Button size="sm" leftIcon={Plus} asChild>
            Add new pet
          </Button>
        </Link>
      </div>
    </div>
  );
}
