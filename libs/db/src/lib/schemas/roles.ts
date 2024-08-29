import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { rolesUsers } from './rolesUsers';

const rolesEnum = pgEnum('name', [
  'ShelterAdmin',
  'ShelterSuperAdmin',
  'SiteAdmin',
]);

export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: rolesEnum('name').notNull(),
});

export const roleRelations = relations(roles, ({ many }) => ({
  roleUser: many(rolesUsers),
}));

export type Role = InferSelectModel<typeof roles>;
