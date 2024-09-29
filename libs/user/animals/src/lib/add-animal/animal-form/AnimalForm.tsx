'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@petsy/shadcn-components';
import { Loader2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { BirthDate } from './BirthDate';
import { CategoryAutocomplete } from './CategoryAutocomplete';
import { Gender } from './Gender';
import PhotoUpload from './PhotoUpload';
import { SprayedOrNeutered } from './SprayedOrNeutered';
import type { AnimalFormValues } from './validationSchema';
import { animalValidationSchema } from './validationSchema';

export const AnimalForm = ({
  handleSaveAction,
  isLoading,
}: {
  handleSaveAction: (
    formValues: AnimalFormValues,
    setError: UseFormReturn<AnimalFormValues>['setError']
  ) => void;
  isLoading?: boolean;
}) => {
  const form = useForm<AnimalFormValues>({
    defaultValues: {
      birthDate: null,
      name: '',
      category: null,
      breed: '',
      gender: 'Female',
      sprayedOrNeutered: 'unknown',
      photos: [],
    },
    resolver: zodResolver(animalValidationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => {
          handleSaveAction(values, form.setError);
        })}
      >
        <PhotoUpload />

        <CategoryAutocomplete />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem required>
              <FormLabel>Pet name</FormLabel>
              <FormControl>
                <Input placeholder="Woof woof" {...field} size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <BirthDate />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Input placeholder="Enter breed" {...field} size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Gender />

        <SprayedOrNeutered />

        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            disabled={isLoading}
            leftIconClassName="animate-spin"
            leftIcon={isLoading ? Loader2 : undefined}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
