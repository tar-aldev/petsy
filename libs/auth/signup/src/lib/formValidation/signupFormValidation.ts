import { z } from 'zod';

export const signupValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(8, 'Password should have at least 8 characters'),
});

export type SignUpFormValues = z.infer<typeof signupValidationSchema>;
export type ServerSideValidationErrors = Partial<
  Record<keyof SignUpFormValues, string | undefined>
>;
