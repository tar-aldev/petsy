import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ElementType } from 'react';

type LinkMenuItem = {
  label: string;
  href: string;
  icon: ElementType;
};

type ButtonMenuItem = {
  label: string;
  onClick: () => void;
  icon: ElementType;
};

type SettingsListItemProps = LinkMenuItem | ButtonMenuItem;

const isLinkMenuItem = (
  props: SettingsListItemProps
): props is LinkMenuItem => {
  return !!(props as LinkMenuItem).href;
};

export function SettingsListItem(props: SettingsListItemProps) {
  if (isLinkMenuItem(props)) {
    const { href, icon: Icon, label } = props;

    return (
      <Link
        href={href}
        className="flex items-center justify-between px-4 py-2.5 hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <span>{label}</span>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Link>
    );
  }

  const { icon: Icon, label, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-2.5 hover:text-primary transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6" />
        <p>{label}</p>
      </div>
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}
