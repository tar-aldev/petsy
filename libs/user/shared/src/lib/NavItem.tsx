'use client';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  Icon,
  label,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      className={clsx(
        'flex flex-col items-center text-sm',
        isActive && 'text-blue-400'
      )}
    >
      <Icon size={30} />
      {label}
    </Link>
  );
}
