'use client';

import { LogOut } from 'lucide-react';
import { SettingsListItem } from './SettingsListItem';
import { useClerk } from '@clerk/nextjs';

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <div className="bg-white">
      <SettingsListItem
        onClick={() => {
          signOut({ redirectUrl: '/' });
        }}
        label="Log out"
        icon={LogOut}
      />
    </div>
  );
}
