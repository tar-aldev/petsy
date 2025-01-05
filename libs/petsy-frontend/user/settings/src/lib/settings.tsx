import { currentUser } from '@clerk/nextjs/server';

import { AvatarWithUserName, Typography } from '@petsy/shared-components';
import {
  Bell,
  Globe,
  HeadphonesIcon,
  KeyRound,
  Settings as SettingsIcon,
  Share2,
  User,
} from 'lucide-react';
import { SettingsListItem } from './SettingsListItem';
import { SignOutButton } from './SignOutButton';

const accountSectionLinks = [
  {
    href: '/',
    label: 'Edit profile',
    icon: User,
  },
  {
    href: '/',
    label: 'Change password',
    icon: KeyRound,
  },
  {
    href: '/',
    label: 'Notifications',
    icon: Bell,
  },
];

const generalSectionLinks = [
  {
    href: '/',
    label: 'Change language',
    icon: Globe,
  },
  {
    href: '/',
    label: 'Help & Support',
    icon: HeadphonesIcon,
  },
  {
    href: '/',
    label: 'Share the app',
    icon: Share2,
  },
];

export async function Settings() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        className="text-primary flex items-center gap-2 mb-8 p-4"
      >
        <SettingsIcon width={32} height="auto" />
        Settings
      </Typography>

      <div className="flex justify-center mb-4">
        <AvatarWithUserName
          fullName={user.fullName}
          imageUrl={user.imageUrl}
          avatarClassName="h-16 w-16"
        />
      </div>

      <div className="space-y-4">
        {/* Account Section */}
        <div>
          <Typography muted component="h2" variant="p" className="px-4">
            Account
          </Typography>
          <div className="space-y-4 bg-white">
            {accountSectionLinks.map((item) => {
              return (
                <SettingsListItem
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              );
            })}
          </div>
        </div>

        {/* General Settings Section */}
        <div>
          <Typography muted component="h2" variant="p" className="px-4">
            General settings
          </Typography>
          <div className="space-y-4 bg-white">
            {generalSectionLinks.map((item) => {
              return (
                <SettingsListItem
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        <SignOutButton />
      </div>
    </div>
  );
}
