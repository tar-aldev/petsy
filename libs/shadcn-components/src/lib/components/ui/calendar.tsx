'use client';

import * as React from 'react';
import type { MonthCaptionProps } from 'react-day-picker';
import { DayPicker, useDayPicker } from 'react-day-picker';

import { cn } from '@petsy/shadcn-utils';
import { buttonVariants } from './button';
import { format, getYear, setMonth, setYear, getMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  Select,
  SelectItem,
} from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const monthNames = Array.from({ length: 12 }, (_, index) =>
  format(new Date(2021, index, 1), 'LLLL', { locale: enUS })
);
const years = Array.from(
  { length: 100 },
  (_, index) => getYear(new Date()) - index
);

const DropdownMonthCaption = (props: MonthCaptionProps) => {
  const { goToMonth, selected } = useDayPicker();
  const currentVisibleMonth = props.calendarMonth.date;

  const handleMonthChange = (newMonth: string) => {
    const parsedMonth = Number(newMonth);
    goToMonth(setMonth(currentVisibleMonth as Date, parsedMonth));
  };

  const handleYearChange = (newYear: string) => {
    const parsedYear = Number(newYear);
    goToMonth(setYear(currentVisibleMonth as Date, parsedYear));
  };

  return (
    <div className="flex space-x-2">
      <Select
        value={`${getMonth(currentVisibleMonth)}`}
        onValueChange={handleMonthChange}
      >
        <SelectTrigger size="xs" className="flex-grow">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            {monthNames.map((monthName: string, i: number) => (
              <SelectItem
                value={`${i}`}
                key={i}
                className={cn({
                  'text-primary': Number(i) === getMonth(selected as Date),
                })}
              >
                {monthName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={`${getYear(currentVisibleMonth)}`}
        onValueChange={handleYearChange}
      >
        <SelectTrigger size="xs">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {years.map((year, i: number) => (
              <SelectItem
                value={`${year}`}
                key={i}
                className={cn({
                  'text-primary': Number(year) === getYear(selected as Date),
                })}
              >
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 relative',
        month: 'space-y-4',
        month_caption: 'flex pt-1 items-center justify-center',
        caption_label: 'text-sm font-medium aria-hidden:hidden',
        nav: 'absolute h-7 space-x-1 flex items-center w-full',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20'
        ),
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        MonthCaption:
          props.captionLayout === 'dropdown' && props.mode === 'single'
            ? DropdownMonthCaption
            : undefined,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
