'use client';

import type { ButtonSize } from '@petsy/shadcn-components';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@petsy/shadcn-components';
import { cn } from '@petsy/shadcn-utils';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { useDebounce } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { useState, type ComponentType, type ReactNode } from 'react';

type Option = { id: string; name: string };

export type AutocompleteOptionsFetcher<T extends Option = Option> = ({
  searchStr,
}: {
  searchStr: string;
}) => Promise<T[]>;

interface AutocompleteProps<T extends Option> {
  value: Option | null;
  ButtonWrapper?: ComponentType<{ children: ReactNode }>;
  triggerText?: string;
  searchNoMatchText?: string;
  onChange: (option: T) => void;
  optionsFetcher: AutocompleteOptionsFetcher<T>;
  fetcherKey: string[];
  size?: ButtonSize;
  name?: string;
}

export function Autocomplete<T extends Option>({
  value,
  onChange,
  optionsFetcher,
  triggerText = 'Select an option',
  searchNoMatchText = 'No search results...',
  ButtonWrapper,
  fetcherKey,
  size,
  name,
}: AutocompleteProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [debouncedSearchStr, setDebouncedSearchStr] = useState('');

  useDebounce(
    () => {
      setDebouncedSearchStr(searchStr);
    },
    400,
    [searchStr]
  );

  const {
    data: options = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: [...fetcherKey, { searchStr: debouncedSearchStr }],
    queryFn: () => optionsFetcher({ searchStr: debouncedSearchStr }),
    enabled: isOpen,
    placeholderData: (previousData) => previousData,
    throwOnError: false,
  });

  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      className={cn(
        'w-full justify-between',
        !value && 'text-muted-foreground'
      )}
      size={size}
      rightIcon={ChevronsUpDown}
    >
      {value?.name ?? triggerText}
    </Button>
  );

  return (
    <Popover
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        {ButtonWrapper ? (
          <ButtonWrapper>{triggerButton}</ButtonWrapper>
        ) : (
          triggerButton
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 popover-content-width-same-as-its-trigger">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={searchStr}
            onValueChange={(search) => {
              setSearchStr(search);
            }}
            rightIcon={
              isFetching ? (
                <Loader2 className="animate-spin mute opacity-50" />
              ) : null
            }
          />
          <CommandList>
            <CommandEmpty>
              {error ? 'Unable to fetch options' : searchNoMatchText}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className={cn('cursor-pointer')}
                  value={option.name}
                  key={option.id}
                  onSelect={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
