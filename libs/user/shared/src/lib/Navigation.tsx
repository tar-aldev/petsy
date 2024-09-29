import { NavItem } from './NavItem';
import {
  ContactRound,
  Heart,
  MessageCircle,
  Search,
  User2,
} from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 w-full flex gap-6 justify-center items-center shadow-[0_35px_40px_15px] z-10 bg-white h-24">
      <NavItem Icon={Heart} label="Favorites" href="/user/favorites" />
      <NavItem Icon={Search} label="Explore" href="/explore" />
      <NavItem Icon={User2} label="Profile" href="/user/profile" />
      <NavItem Icon={MessageCircle} label="Messages" href="/user/messages" />
      <NavItem Icon={ContactRound} label="Contacts" href="/user/contacts" />
    </nav>
  );
}
