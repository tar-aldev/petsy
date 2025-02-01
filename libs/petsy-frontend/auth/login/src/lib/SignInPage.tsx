'use client';
import { useSignIn } from '@clerk/nextjs';

import { Typography } from '@petsy/shared-components';
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import type { SignInFormValues } from './SignInForm';
import { SignInForm } from './SignInForm';
import { useToast } from '@petsy/shadcn-components';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useState } from 'react';
import { getError } from './utils';
import type { UserFacingError } from '@petsy/utils';

export function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { toast } = useToast();

  const [error, setError] = useState<UserFacingError | undefined>();

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
      if (isClerkAPIResponseError(error)) {
        console.log('error.error', error.errors);

        setError(getError(error.errors[0]?.code));
      } else {
        const { primaryMessage, secondaryMessage } = getError('');

        toast({
          title: primaryMessage,
          description: secondaryMessage,
          variant: 'error',
        });
      }
    }
  };

  return (
    <>
      <Typography muted>Log In to your Petsy account!</Typography>
      <div className="pt-16">
        {isLoaded ? (
          <SignInForm handleSignIn={handleSignIn} error={error} />
        ) : (
          <div className="flex justify-center">
            <ScaleLoader />
          </div>
        )}
      </div>
    </>
  );
}
