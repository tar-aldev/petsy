import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { accounts, db, users } from '@petsy/db';
import { findUserById } from '@petsy/db';
import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    // role: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    // TODO: Add RBAC
    role: string;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== 'credentials') {
        return true;
      }
      if (!user.id) {
        return false;
      }

      const existingUser = await findUserById(user.id);

      return !!existingUser;
    },
    // jwt: () => {},
    // session: () => {},
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: 'jwt' },
  ...authConfig,
});
