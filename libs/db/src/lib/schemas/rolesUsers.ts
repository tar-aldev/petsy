import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { roles } from './roles';
import { relations } from 'drizzle-orm';

export const rolesUsers = pgTable(
  'roles_users',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id),
  },
  ({ roleId, userId }) => ({
    pk: primaryKey({ columns: [roleId, userId] }),
  })
);

export const roleUserRelations = relations(rolesUsers, ({ one }) => ({
  role: one(roles, {
    fields: [rolesUsers.roleId],
    references: [roles.id],
  }),
  user: one(users, {
    fields: [rolesUsers.userId],
    references: [users.id],
  }),
}));
