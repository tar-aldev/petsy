import { Button } from '@petsy/shadcn-components';
import { Plus } from 'lucide-react';

export function AnimalsPage() {
  return (
    <div>
      <Button leftIcon={Plus}>Add a new pet</Button>
    </div>
  );
}
