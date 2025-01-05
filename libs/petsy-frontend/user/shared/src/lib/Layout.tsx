'use client';

import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div>{children}</div>
      <Navigation />
    </main>
  );
}
