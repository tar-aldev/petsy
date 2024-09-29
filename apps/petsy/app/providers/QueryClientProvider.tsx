'use client';
import {
  QueryClientProvider as TQQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import type { ReactNode } from 'react';

// Create a client
const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <TQQueryClientProvider client={queryClient}>
      {children}
    </TQQueryClientProvider>
  );
}
