import type { UseFormSetError } from 'react-hook-form';
import { z } from 'zod';

export const signupValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(8, 'Password should have at least 8 characters'),
});

export const setValidationErrors = (
  errors: ServerSideValidationErrors,
  setError: UseFormSetError<SignUpFormValues>
) => {
  Object.entries(errors).forEach(([errKey, errMessage]) => {
    if (errMessage) {
      setError(errKey as keyof SignUpFormValues, {
        message: errMessage,
      });
    }
  });
};

export type SignUpFormValues = z.infer<typeof signupValidationSchema>;
export type ServerSideValidationErrors = Record<
  keyof SignUpFormValues,
  string | undefined
>;
