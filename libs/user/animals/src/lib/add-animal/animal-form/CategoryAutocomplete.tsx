'use client';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@petsy/shadcn-components';
import { Autocomplete } from '@petsy/shared-components';
import { useFormContext } from 'react-hook-form';
import type { AnimalFormValues } from './validationSchema';
import type { AutocompleteOptionsFetcher } from '@petsy/shared-components';

const optionsFetcher: AutocompleteOptionsFetcher = ({ searchStr }) => {
  const queryParams = new URLSearchParams({ name: searchStr });
  return fetch(`/api/animal-categories?${queryParams}`, { cache: 'no-store' })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const CategoryAutocomplete = () => {
  const { control } = useFormContext<AnimalFormValues>();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field: { value, onChange, name } }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Category</FormLabel>
          <Autocomplete
            fetcherKey={['AnimalCategories']}
            ButtonWrapper={FormControl}
            onChange={onChange}
            optionsFetcher={optionsFetcher}
            value={value}
            size="sm"
            triggerText="Select category"
            name={name}
          />
          <FormMessage />
          <FormDescription>Don't see category for your pet?</FormDescription>
        </FormItem>
      )}
    />
  );
};
