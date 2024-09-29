import {
  Button,
  Calendar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@petsy/shadcn-components';
import { cn } from '@petsy/shadcn-utils';
import { format, isAfter } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const today = new Date();
export function BirthDate() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="birthDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(!field.value && 'text-muted-foreground')}
                  rightIcon={CalendarIcon}
                  size="sm"
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => isAfter(date, today)}
                hideNavigation
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Animal's date of birth is used to calculate its age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
