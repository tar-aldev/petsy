import { cn } from '@petsy/shadcn-components';
import { cva, type VariantProps } from 'class-variance-authority';

import type { ReactNode } from 'react';

type NonNullObject<T> = {
  [K in keyof T]: T[K] extends null ? never : Exclude<T[K], null>;
};

type HeadingVariants = VariantProps<typeof headingVariants>;
type TypographyVariantProps = Pick<HeadingVariants, 'component'> &
  Pick<HeadingVariants, 'variant'>;

interface TypographyProps extends NonNullObject<TypographyVariantProps> {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

const headingVariants = cva('', {
  variants: {
    component: {
      p: 'text-base',
      h1: 'font-boldtext-4xl',
      h2: 'font-bold text-3xl',
      h3: 'font-bold text-2xl',
      h4: 'font-bold text-xl',
      h5: 'font-bold text-lg',
      h6: 'font-bold text-base',
    },
    variant: {
      p: 'text-base',
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
    },
  },
  defaultVariants: {
    component: 'h1',
  },
});

export function Typography({
  component = 'p',
  variant,
  muted = false,
  className,
  children,
}: TypographyProps) {
  const Component = component;

  return (
    <Component
      className={cn(
        { 'text-gray-500': muted },
        headingVariants({ component, variant: variant ?? component, className })
      )}
    >
      {children}
    </Component>
  );
}
