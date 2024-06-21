import type { ReactNode } from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export function Typography({ variant, children }: TypographyProps) {
  const mapping: Record<TypographyProps['variant'], ReactNode> = {
    h1: <h1 className="text-4xl font-bold">{children}</h1>,
    h2: <h2 className="text-3xl font-bold">{children}</h2>,
    h3: <h3 className="text-2xl font-bold">{children}</h3>,
    h4: <h4 className="text-xl font-bold">{children}</h4>,
    h5: <h5 className="text-lg font-bold">{children}</h5>,
    h6: <h6 className="text-base font-bold">{children}</h6>,
  };

  return mapping[variant];
}
