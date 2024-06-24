import { Gallery } from './Gallery';
import { Typography } from '@petsy/shared-components';
import { Button } from '@petsy/shadcn-components';
import Link from 'next/link';

export function Landing() {
  return (
    <main className="h-full flex flex-col">
      <div className="relative flex h-2/3 p-4">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-20% to-white z-10"></div>
        <Gallery />
      </div>
      <div className="flex p-4 w-full bottom-0 absolute min-h-72 h-[calc(33.3%+6.5rem)] z-20 bg-white">
        <section className="py-4 flex flex-col space-y-10">
          <div className="w-full space-y-2 text-center flex-1">
            <Typography component="h1">Petsy</Typography>
            <Typography muted className="text-center">
              Are you ready to find a new friend? Or you want to find a new home
              for your pet? Petsy will help you!
            </Typography>
          </div>

          <div className="w-full space-y-2">
            <Button className="w-full" size="lg" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="w-full" variant="outline" size="lg" asChild>
              <Link href="/signup">Signup</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
