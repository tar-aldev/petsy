import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@petsy/shadcn-components';
import { useFormContext } from 'react-hook-form';
import type { AnimalFormValues } from './validationSchema';

export function SprayedOrNeutered() {
  const { control } = useFormContext<AnimalFormValues>();

  return (
    <FormField
      control={control}
      name="sprayedOrNeutered"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sprayed or neutered</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value ?? undefined}
              className="flex space-x-2"
            >
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal">Yes</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal">No</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="unknown" />
                </FormControl>
                <FormLabel className="font-normal">Unknown</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
