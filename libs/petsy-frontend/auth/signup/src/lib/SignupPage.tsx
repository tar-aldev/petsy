'use client';

import { useSignUp } from '@clerk/nextjs';
import { Typography } from '@petsy/shared-components';
import type { EmailVerificationFormValues } from './EmailVerificationForm';
import { EmailVerificationForm } from './EmailVerificationForm';
import { SignupForm } from './SignUpForm';
import type { SignUpFormValues } from './formValidation/signupFormValidation';
import { useRouter, useSearchParams } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useToast } from '@petsy/shadcn-components';
import { getError } from './utils';
import { useState } from 'react';
import type { UserFacingError } from '@petsy/utils';

export function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<UserFacingError | undefined>();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { toast } = useToast();

  const handleSignup = async (values: SignUpFormValues) => {
    // const result = await signup(values);
    if (!signUp) return;

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      const params = new URLSearchParams();
      params.set('stage', 'verify-email');
      router.push(`?${params.toString()}`);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
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

  const handleVerifyEmail = async (values: EmailVerificationFormValues) => {
    if (!isLoaded) return;

    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: values.verificationCode,
      });
      if (result?.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/user/profile/animals');
      }
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const stage = searchParams.get('stage');

  return (
    <>
      <Typography muted className="mb-2">
        Create your Petsy account!
      </Typography>
      <Typography muted>
        You will be able to add more account information after registering
      </Typography>
      <div className="py-8">
        {stage === 'verify-email' ? (
          <EmailVerificationForm handleVerifyEmail={handleVerifyEmail} />
        ) : (
          <SignupForm handleSignup={handleSignup} error={error} />
        )}
      </div>
    </>
  );
}
