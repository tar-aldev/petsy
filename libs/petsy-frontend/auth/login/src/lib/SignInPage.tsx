'use client';
import { useSignIn } from '@clerk/nextjs';
import { Typography } from '@petsy/shared-components';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import type { SignInFormValues } from './SignInForm';
import { SignInForm } from './SignInForm';

export function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSignIn = async (value: SignInFormValues) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn?.create({
        identifier: value.email,
        password: value.password,
      });

      if (result?.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/user/profile/animals');
      }
    } catch (error) {
      console.log('ERR', error);
    }
  };

  return (
    <>
      <Typography muted>Log In to your Petsy account!</Typography>
      <div className="pt-16">
        {isLoaded ? (
          <SignInForm handleSignIn={handleSignIn} />
        ) : (
          <div className="flex justify-center">
            <ScaleLoader />
          </div>
        )}
      </div>
    </>
  );
}
