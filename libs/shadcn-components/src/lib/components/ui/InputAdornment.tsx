import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@petsy/shadcn-utils';

const iconVariants = cva(
  'absolute top-1/2 transform -translate-y-1/2 text-muted-foreground',
  {
    variants: {
      size: {
        default: 'w-5 h-5',
        sm: 'w-5 h-5',
        xs: 'h-4 h-4',
      },
      position: {
        start: '',
        end: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
    compoundVariants: [
      {
        size: 'default',
        position: 'start',
        className: 'left-4',
      },
      {
        size: 'sm',
        position: 'start',
        className: 'left-3',
      },
      {
        size: 'xs',
        position: 'start',
        className: 'left-2',
      },

      {
        size: 'default',
        position: 'end',
        className: 'right-4',
      },
      {
        size: 'sm',
        position: 'end',
        className: 'right-3',
      },
      {
        size: 'xs',
        position: 'end',
        className: 'right-2',
      },
    ],
  }
);

interface InputAdornmentProps extends VariantProps<typeof iconVariants> {
  Icon: LucideIcon;
}

export const InputAdornment = ({
  position,
  size,
  Icon,
}: InputAdornmentProps) => {
  return <Icon className={cn(iconVariants({ size, position }))} />;
};
