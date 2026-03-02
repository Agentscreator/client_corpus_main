import { pgTable, serial, text, timestamp, boolean, integer, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone: text('phone'),
  stripeAccountId: text('stripe_account_id'),
  stripeConnected: boolean('stripe_connected').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  siteId: text('site_id').notNull().default('site_0'), // Site identifier
  ownerId: integer('owner_id').references(() => users.id), // Site owner (agentverse884@gmail.com)
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  service: text('service').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending'), // pending, paid, completed
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  bookingDate: timestamp('booking_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const nailTechs = pgTable('nail_techs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
