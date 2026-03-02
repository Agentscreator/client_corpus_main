# Booking Site Setup Guide

## Overview
This is a fully functional booking site with Stripe payment integration, built with Next.js, Drizzle ORM, and PostgreSQL (Neon).

## Features
✅ Guest booking system (no authentication required)
✅ Service selection with pricing
✅ Date picker for appointments
✅ Stripe payment integration
✅ Webhook handling for payment confirmation
✅ Database schema with users, bookings, and nail techs

## Setup Instructions

### 1. Install Dependencies
```bash
yarn install
```

### 2. Configure Environment Variables
Update `.env.local` with your actual Stripe keys:
- Get keys from: https://dashboard.stripe.com/apikeys
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your publishable key (starts with pk_)
- `STRIPE_SECRET_KEY` - Your secret key (starts with sk_)
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (starts with whsec_)

### 3. Push Database Schema
```bash
yarn db:push
```

This creates the following tables:
- `users` - User accounts (optional for guest bookings)
- `bookings` - Booking records with payment tracking
- `nail_techs` - Nail technician information

### 4. Run Development Server
```bash
yarn dev
```

Visit: http://localhost:3000/book

## Booking Flow

1. **Booking Form** (`/book`)
   - User enters name, email
   - Selects service (Basic Manicure, Gel Manicure, etc.)
   - Picks appointment date
   - Submits → Creates booking in database

2. **Payment Page** (`/payment`)
   - Displays Stripe payment form
   - Creates PaymentIntent
   - Updates booking with payment intent ID
   - User completes payment

3. **Success Page** (`/booking-success`)
   - Confirmation message
   - Webhook updates booking status to "paid"

## API Routes

### `/api/bookings` (POST, GET)
- POST: Create new booking
- GET: Fetch all bookings

### `/api/bookings/[id]` (GET, PATCH)
- GET: Fetch single booking
- PATCH: Update booking

### `/api/create-payment-intent` (POST)
- Creates Stripe PaymentIntent
- Links payment to booking

### `/api/webhooks/stripe` (POST)
- Handles Stripe webhook events
- Updates booking status on payment success

## Database Schema

### bookings table
- `id` - Primary key
- `userId` - Optional reference to users (nullable for guest bookings)
- `clientName` - Customer name
- `clientEmail` - Customer email
- `service` - Service name
- `price` - Service price (decimal)
- `status` - pending | paid | completed
- `stripePaymentIntentId` - Stripe payment tracking
- `bookingDate` - Appointment date/time
- `createdAt` - Record creation timestamp

### users table
- `id` - Primary key
- `name`, `email`, `password` - User credentials
- `phone` - Contact number
- `stripeAccountId` - For connected accounts (future)
- `stripeConnected` - Connection status
- `createdAt` - Record creation timestamp

### nail_techs table
- `id` - Primary key
- `name`, `email`, `phone` - Tech information
- `createdAt` - Record creation timestamp

## Stripe Webhook Setup (Production)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook signing secret to `.env.local`

## Testing Locally with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Use test cards
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
```

## Database Commands

```bash
# Generate migration files
yarn db:generate

# Push schema changes
yarn db:push

# Open Drizzle Studio (database GUI)
yarn db:studio
```

## Services Available

1. Basic Manicure - $25
2. Gel Manicure - $45
3. Basic Pedicure - $35
4. Gel Pedicure - $55
5. Acrylic Full Set - $65
6. Nail Art - $15

## Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Email notifications (Resend/SendGrid)
- [ ] Admin dashboard for managing bookings
- [ ] Calendar view for available slots
- [ ] Nail tech assignment
- [ ] Booking cancellation/rescheduling
- [ ] Customer reviews and ratings
- [ ] Loyalty program

## Troubleshooting

### TypeScript Errors
Run `yarn install` to ensure all dependencies are installed.

### Database Connection Issues
Verify `DATABASE_URL` in `.env.local` is correct.

### Stripe Payment Fails
- Check Stripe keys are correct
- Verify webhook secret matches
- Use test card numbers in test mode

### Booking Not Created
Check browser console and server logs for errors.

## Support

For issues or questions, check:
- Stripe Docs: https://stripe.com/docs
- Drizzle Docs: https://orm.drizzle.team
- Next.js Docs: https://nextjs.org/docs
