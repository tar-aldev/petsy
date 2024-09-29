'use client';
import { Typography } from '@petsy/shared-components';
import clsx from 'clsx';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryItemProps {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export function CategoryItem({ Icon, href, label }: CategoryItemProps) {
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={clsx(
        'w-1/3 flex flex-col content-center items-center py-4 px-6 rounded-md',
        isActive
          ? 'bg-gradient-to-br from-blue-400 to-purple-600 text-white'
          : 'bg-primary/20 text-primary'
      )}
    >
      <Icon />
      <Typography>{label}</Typography>
    </Link>
  );
}
