'use client';

import { Camera, NotepadText, PawPrint } from 'lucide-react';
import { CategoryItem } from './CategoryItem';

export function Categories() {
  const basePath = '/user/profile';

  return (
    <div className="flex gap-4 justify-between">
      <CategoryItem
        Icon={PawPrint}
        href={`${basePath}/animals`}
        label="Animals"
      />
      <CategoryItem Icon={Camera} href={`${basePath}/photos`} label="Photos" />
      <CategoryItem
        Icon={NotepadText}
        href={`${basePath}/posts`}
        label="Posts"
      />
    </div>
  );
}
