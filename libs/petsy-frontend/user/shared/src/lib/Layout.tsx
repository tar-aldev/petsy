'use client';

import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="p-4">{children}</div>
      <Navigation />
    </main>
  );
}
