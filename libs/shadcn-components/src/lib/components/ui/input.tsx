import React from 'react';
import { cn } from '@petsy/shadcn-utils';
import type { LucideIcon } from 'lucide-react';
import './input.css';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { InputAdornment } from './InputAdornment';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 rounded-md px-3',
        xs: 'h-8 rounded-md px-2 text-sm',
      },
      withIcon: {
        start: '',
        end: '',
        both: '',
        default: '',
      },
    },
    defaultVariants: {
      size: 'default',
      withIcon: 'default',
    },
    compoundVariants: [
      {
        withIcon: 'start',
        size: 'default',
        className: 'pl-12',
      },
      {
        withIcon: 'start',
        size: 'sm',
        className: 'pl-11',
      },
      {
        withIcon: 'start',
        size: 'xs',
        className: 'pl-10',
      },

      {
        withIcon: 'end',
        size: 'default',
        className: 'pr-12',
      },
      {
        withIcon: 'end',
        size: 'sm',
        className: 'pr-11',
      },
      {
        withIcon: 'end',
        size: 'xs',
        className: 'pr-10',
      },

      {
        withIcon: 'both',
        size: 'default',
        className: 'px-12',
      },
      {
        withIcon: 'both',
        size: 'sm',
        className: 'px-11',
      },
      {
        withIcon: 'both',
        size: 'xs',
        className: 'px-10',
      },
    ],
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<InputVariants, 'withIcon'> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const getWithIconProp = (
  startIcon: boolean,
  endIcon: boolean
): InputVariants['withIcon'] => {
  if (startIcon && endIcon) {
    return 'both';
  }

  if (startIcon) {
    return 'start';
  }

  if (endIcon) {
    return 'end';
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, size, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative input-container">
        {StartIcon && (
          <InputAdornment Icon={StartIcon} position="start" size={size} />
        )}
        <input
          type={type}
          className={cn(
            inputVariants({
              size,
              className,
              withIcon: getWithIconProp(!!StartIcon, !!EndIcon),
            })
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <InputAdornment Icon={EndIcon} position="end" size={size} />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
