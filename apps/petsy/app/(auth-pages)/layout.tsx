import type { ReactNode } from 'react';
import PawIcon from './paw.svg';
import { Typography } from '@petsy/shared-components';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <PawIcon className="w-20 h-auto" />
      </div>
      <Typography>Hi Friend!</Typography>
      {children}
    </div>
  );
}