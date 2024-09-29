import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@petsy/shadcn-utils';
import type { LucideIcon } from 'lucide-react';

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
        'link-filled': 'bg-primary/10 text-primary',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 rounded-md px-3',
        xs: 'h-8 rounded-md px-2 text-sm',
        icon: 'h-10 w-10',
      },
      leftIcon: {
        true: '',
        false: '',
      },
      rightIcon: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      leftIcon: false,
      rightIcon: false,
    },
    compoundVariants: [
      {
        size: 'default',
        leftIcon: true,
        className: 'pl-12',
      },
      {
        size: 'sm',
        leftIcon: true,
        className: 'pl-10',
      },
      {
        size: 'xs',
        leftIcon: true,
        className: 'pl-8',
      },
      {
        size: 'default',
        rightIcon: true,
        className: 'pr-12',
      },
      {
        size: 'sm',
        rightIcon: true,
        className: 'pr-10',
      },
      {
        size: 'xs',
        rightIcon: true,
        className: 'pr-8',
      },
    ],
  }
);

const iconVariants = cva('', {
  variants: {
    size: {
      default: 'w-5 h-5',
      sm: 'w-4 h-4',
      xs: 'h-3 h-3',
    },
    position: {
      left: 'left-4',
      right: 'right-4',
    },
  },
  defaultVariants: {
    size: 'default',
    position: 'left',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'leftIcon' | 'rightIcon'> {
  asChild?: boolean;
  leftIcon?: React.ComponentType<React.SVGProps<unknown>> | LucideIcon;
  leftIconClassName?: string;
  rightIcon?: React.ComponentType<React.SVGProps<unknown>> | LucideIcon;
  rightIconClassName?: string;
}

export type ButtonSize = ButtonProps['size'];
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      leftIcon: LeftIcon,
      leftIconClassName,
      rightIcon: RightIcon,
      rightIconClassName,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'relative',
          buttonVariants({
            variant,
            size,
            leftIcon: !!LeftIcon,
            rightIcon: !!RightIcon,
            className,
          })
        )}
        type={type}
        ref={ref}
        {...props}
      >
        <span>
          {LeftIcon && size !== 'icon' && (
            <span
              className={iconVariants({
                size,
                position: 'left',
                className: 'absolute top-[50%] translate-y-[-50%]',
              })}
            >
              <LeftIcon
                className={iconVariants({
                  size,
                  position: 'left',
                  className: leftIconClassName,
                })}
              />
            </span>
          )}

          {RightIcon && size !== 'icon' && (
            <span
              className={iconVariants({
                size,
                position: 'right',
                className: 'absolute top-[50%] translate-y-[-50%]',
              })}
            >
              <RightIcon
                className={iconVariants({
                  size,
                  position: 'right',
                  className: rightIconClassName,
                })}
              />
            </span>
          )}

          <Slottable>{children}</Slottable>
        </span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
