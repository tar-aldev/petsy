import { findUserByEmailForAuthorization } from '@petsy/db';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authConfig = {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),

    Credentials({
      authorize: async (credentials) => {
        const validatedFields = credentialsSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await findUserByEmailForAuthorization(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch)
            return {
              ...user,
              roles: user.roleUser.map(({ role }) => ({
                id: role.id,
                name: role.name,
              })),
            };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
