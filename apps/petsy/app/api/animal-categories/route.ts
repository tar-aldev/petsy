import { getAnimalCategories } from '@petsy/db';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const animalCategories = await getAnimalCategories({
    name: searchParams.get('name') ?? '',
  });
  return NextResponse.json({ data: animalCategories });
}
