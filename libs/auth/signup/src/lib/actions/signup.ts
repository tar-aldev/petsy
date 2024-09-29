'use server';

import { signIn } from '@petsy/auth-config/server';
import { createUser, findUserByEmail } from '@petsy/db';
import { hash } from 'bcryptjs';
import type { SignUpFormValues } from '../formValidation/signupFormValidation';
import { signupValidationSchema } from '../formValidation/signupFormValidation';
import { AuthError } from 'next-auth';
import type { FormActionFailure, Success } from '@petsy/shared-types';

export const signup = async (
  credentials: SignUpFormValues
): Promise<Success | FormActionFailure<SignUpFormValues>> => {
  const validationResult = signupValidationSchema.safeParse(credentials);
  if (validationResult.error) {
    const fieldErrors = validationResult.error.formErrors.fieldErrors;

    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const {
    data: { email, password },
  } = validationResult;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      errors: {
        email: 'User with the given email already exists',
        password: undefined,
      },
    };
  }

  // insert new user into DB
  const hashedPassword = await hash(password, 10);
  const [user] = await createUser({ email: email, password: hashedPassword });

  try {
    await signIn('credentials', {
      email: user.email,
      password: password,
      redirectTo: '/user/profile/animals',
    });

    return {
      success: 'Successfully signed up.',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw error;
  }
};
