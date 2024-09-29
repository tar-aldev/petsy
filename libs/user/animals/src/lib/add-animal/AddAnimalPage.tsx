'use client';
import { Button, useToast } from '@petsy/shadcn-components';
import {
  isFieldsError,
  isFormActionSuccess,
  isFormError,
} from '@petsy/shared-types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { addNewAnimal } from './actions';
import { AnimalForm } from './animal-form/AnimalForm';
import { type AnimalFormValues } from './animal-form/validationSchema';
import { transformFormValuesToFormData } from './utils';
import { setValidationErrors } from '@petsy/shared-utils';
import type { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export function AddAnimalPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAddAnimal = async (
    formValues: AnimalFormValues,
    setError: UseFormReturn<AnimalFormValues>['setError']
  ) => {
    startTransition(async () => {
      const result = await addNewAnimal(
        transformFormValuesToFormData(formValues)
      );

      if (isFormActionSuccess(result)) {
        toast({
          title: 'Success',
          description: result.success,
        });
        router.replace('/user/profile/animals');
      } else if (isFormError(result)) {
        toast({
          title: 'Error',
          description: result.error,
        });
      } else if (isFieldsError(result)) {
        setValidationErrors(result.errors, setError);
      }
    });
  };

  return (
    <div>
      <Link href="/user/profile/animals">
        <Button asChild leftIcon={ArrowLeft} variant="link">
          Back to animals list
        </Button>
      </Link>

      <div className="pt-8">
        <AnimalForm handleSaveAction={handleAddAnimal} isLoading={isPending} />
      </div>
    </div>
  );
}
