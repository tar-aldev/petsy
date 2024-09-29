'use client';

import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full pb-28">
      <div className="p-4 h-full overflow-auto">{children}</div>
      <Navigation />
    </main>
  );
}
