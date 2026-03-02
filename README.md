# Nail Booking Site with Stripe Integration

A Next.js booking platform with Stripe payments and Drizzle ORM.

## Setup Instructions

1. Install dependencies:
```bash
yarn install
```

2. Configure environment variables:
   - Copy `.env.local` and add your actual Stripe keys from https://dashboard.stripe.com/apikeys
   - Your DATABASE_URL is already configured

3. Push database schema:
```bash
yarn db:push
```

4. Run the development server:
```bash
yarn dev
```

5. Set up Stripe webhook (for production):
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to `.env.local`

## Features

- User booking system
- Stripe payment integration
- Database with Drizzle ORM
- Booking management
- Payment webhooks

## Database Commands

- `yarn db:generate` - Generate migrations
- `yarn db:push` - Push schema to database
- `yarn db:studio` - Open Drizzle Studio

## Routes

- `/book` - Booking form
- `/payment` - Payment page
- `/booking-success` - Success confirmation
