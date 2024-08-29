import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Role } from '@petsy/db';
import {
  accounts,
  db,
  findUserById,
  findUserByIdWithRoles,
  users,
} from '@petsy/db';
import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    roles: Role[];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    roles: Role[];
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
    jwt: async ({ token }) => {
      if (!token.sub) {
        return token;
      }

      try {
        const user = await findUserByIdWithRoles(token.sub);
        if (!user) {
          return token;
        }
        token.name = user?.name;
        token.email = user?.email;
        token.roles = user?.roleUser.map(({ role }) => ({
          id: role.id,
          name: role.name,
        }));
      } catch (err) {
        return token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.email) {
        session.user.email = token.email;
      }

      if (token.name) {
        session.user.name = token.name;
      }

      if (token.email) {
        session.user.roles = token.roles;
      }

      return session;
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: 'jwt' },
  ...authConfig,
});
