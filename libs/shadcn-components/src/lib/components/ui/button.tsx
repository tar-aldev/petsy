import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 rounded-md px-3',
        xs: 'h-8 rounded-md px-2 text-sm',
        icon: 'h-10 w-10',
      },
      iconPosition: {
        start: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        size: 'default',
        iconPosition: 'start',
        className: 'pl-12',
      },
      {
        size: 'sm',
        iconPosition: 'start',
        className: 'pl-10',
      },
      {
        size: 'xs',
        iconPosition: 'start',
        className: 'pl-8',
      },
    ],
  }
);

const iconVariants = cva('absolute', {
  variants: {
    size: {
      default: 'w-7 h-7 left-4',
      sm: 'w-5 h-5 left-3',
      xs: 'h-4 h-4 left-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ComponentType<React.SVGProps<unknown>>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      leftIcon: LeftIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            iconPosition: LeftIcon && size !== 'icon' ? 'start' : undefined,
            className,
          }),
          'relative'
        )}
        ref={ref}
        {...props}
      >
        <span>
          {LeftIcon && size !== 'icon' && (
            <LeftIcon className={cn(iconVariants({ size }))} />
          )}
          <Slottable>{children}</Slottable>
        </span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
