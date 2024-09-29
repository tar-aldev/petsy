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

export function Gender() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem defaultValue={field.value}>
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup
              name={field.name}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-2"
            >
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="Male" />
                </FormControl>
                <FormLabel className="font-normal">Male</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="Female" />
                </FormControl>
                <FormLabel className="font-normal">Female</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
