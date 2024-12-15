'use server';

import { signIn } from '@petsy/auth-config/server';
import { createUser, findUserByEmail } from '@petsy/db';
import { hash } from 'bcryptjs';
import type { SignUpFormValues } from '../formValidation/signupFormValidation';
import { signupValidationSchema } from '../formValidation/signupFormValidation';
import { AuthError } from 'next-auth';

export type Success = { success: string };
export type FormError = {
  formError?: string;
};
export type FieldErrors = {
  errors: Record<keyof SignUpFormValues, string | undefined>;
};
export type Failure = FormError | FieldErrors;

export const isSuccess = (result: Success | Failure): result is Success => {
  return !!(result as Success).success;
};

export const isFormError = (
  result: Success | Failure
): result is Required<FormError> => {
  return !!(result as FormError)?.formError;
};

export const isFieldsError = (
  result: Success | Failure
): result is FieldErrors => {
  return !!(result as FieldErrors)?.errors;
};

export const signup = async (
  credentials: SignUpFormValues
): Promise<Success | Failure> => {
  try {
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
            return { formError: 'Invalid Credentials' };
          default:
            return { formError: 'Something went wrong' };
        }
      }

      throw error;
    }
  } catch (error) {
    console.log('ERR', error);
  }
};
