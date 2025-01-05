import { currentUser } from '@clerk/nextjs/server';
import { Button } from '@petsy/shadcn-components';
import { AvatarWithUserName } from '@petsy/shared-components';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Categories } from './Categories';

// TODO: setup sync of clerk user with own db data
// https://clerk.com/docs/webhooks/sync-data
// https://quick-enabling-swift.ngrok-free.app
export async function ProfileLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AvatarWithUserName
          imageUrl={user?.imageUrl}
          fullName={user?.fullName}
        />
        <Link href="/user/settings">
          <Button asChild variant="link-filled">
            Settings
            <Settings className="ml-2" />
          </Button>
        </Link>
      </div>

      <Categories />

      <div className="py-4">{children}</div>
    </div>
  );
}
