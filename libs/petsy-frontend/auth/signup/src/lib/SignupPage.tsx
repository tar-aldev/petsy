'use client';

import { useSignUp } from '@clerk/nextjs';
import { Typography } from '@petsy/shared-components';
import type { EmailVerificationFormValues } from './EmailVerificationForm';
import { EmailVerificationForm } from './EmailVerificationForm';
import { SignupForm } from './SignUpForm';
import type { SignUpFormValues } from './formValidation/signupFormValidation';
import { useRouter } from 'next/navigation';

export function SignupPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

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
    } catch (error) {
      console.log('ERR', error);
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

  return (
    <>
      <Typography muted className="mb-2">
        Create your Petsy account!
      </Typography>
      <Typography muted>
        You will be able to add more account information after registering
      </Typography>
      <div className="py-8">
        {signUp?.unverifiedFields.includes('email_address') ? (
          <EmailVerificationForm handleVerifyEmail={handleVerifyEmail} />
        ) : (
          <SignupForm handleSignup={handleSignup} />
        )}
      </div>
    </>
  );
}
