import { auth } from '@petsy/auth-config/server';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { Categories } from './Categories';
import type { ReactNode } from 'react';

export async function ProfileLayout({ children }: { children: ReactNode }) {
  const authState = await auth();
  if (!authState?.user) {
    return null;
  }

  const getAvatarLetter = () => {
    if (authState.user?.name) {
      return authState.user?.name?.charAt(0);
    }

    if (authState.user?.email) {
      return authState.user?.email?.charAt(0);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 ">
          <Avatar>
            {authState.user?.image && (
              <AvatarImage src={authState.user?.image} alt="User avatar" />
            )}
            <AvatarFallback className="bg-slate-300">
              {getAvatarLetter()?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Typography className="text-sm">{authState.user?.name}</Typography>
        </div>
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
