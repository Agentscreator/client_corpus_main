# Site Configuration - Site 0

## Overview
This is **Site 0** - a nail booking platform where all bookings and Stripe payments are connected to a single site owner.

## Site Owner
- **Email**: `agentverse884@gmail.com`
- **Site ID**: `site_0`
- **Role**: All bookings and payments flow to this user

## How It Works

### 1. Booking Flow
1. Customer visits `/book`
2. Selects a service from the list
3. Fills in their name, email, and booking date
4. Clicks "Continue to Payment"
5. Redirected to Stripe payment page
6. Completes payment
7. Booking status updated to "paid"

### 2. Database Structure
```
bookings table:
- id: Unique booking ID
- siteId: 'site_0' (identifies this site)
- ownerId: References users.id (agentverse884@gmail.com)
- clientName: Customer name
- clientEmail: Customer email
- service: Selected service
- price: Service price
- status: pending | paid | completed
- stripePaymentIntentId: Stripe payment tracking
- bookingDate: Appointment date/time
- createdAt: Record creation timestamp
```

### 3. Site Owner Auto-Creation
When the first booking is created, the system automatically:
1. Checks if user with `agentverse884@gmail.com` exists
2. If not, creates the user account
3. Links all bookings to this user via `ownerId`

## Services Offered

| Service | Price | Description |
|---------|-------|-------------|
| Basic Manicure | $25 | Classic nail care and polish |
| Gel Manicure | $45 | Long-lasting gel polish |
| Basic Pedicure | $35 | Foot care and polish |
| Gel Pedicure | $55 | Long-lasting gel pedicure |
| Acrylic Full Set | $65 | Full set of acrylic nails |
| Nail Art | $15 | Custom nail designs |

## API Endpoints

### Create Booking
```
POST /api/bookings
Body: {
  clientName: string,
  clientEmail: string,
  service: string,
  price: string,
  bookingDate: string (ISO format)
}
```

### Get All Bookings (Site 0)
```
GET /api/bookings
Returns: All bookings for site_0
```

### Get Site Owner Info
```
GET /api/site-owner
Returns: {
  id: number,
  email: string,
  name: string
}
```

### Get Site Owner Bookings
```
GET /api/bookings/site-owner
Returns: {
  siteOwner: { id, email, name },
  bookings: [...],
  totalBookings: number,
  paidBookings: number
}
```

## Stripe Integration

### Payment Flow
1. Booking created → `status: 'pending'`
2. Payment Intent created with Stripe
3. `stripePaymentIntentId` stored in booking
4. Customer completes payment
5. Webhook receives `payment_intent.succeeded`
6. Booking status updated to `'paid'`

### Webhook Events
- `payment_intent.succeeded` → Updates booking to "paid"
- `payment_intent.payment_failed` → Logs failure

## Configuration Files

### Environment Variables (.env.local)
```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Constants (lib/constants.ts)
```typescript
export const SITE_ID = 'site_0';
export const SITE_OWNER_EMAIL = 'agentverse884@gmail.com';
export const SERVICES = [...];
```

## Testing the Booking Flow

1. **Start the app**:
   ```bash
   yarn dev
   ```

2. **Visit booking page**:
   ```
   http://localhost:3000/book
   ```

3. **Fill in the form**:
   - Name: Test Customer
   - Email: test@example.com
   - Service: Select any service
   - Date: Pick a future date

4. **Complete payment**:
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry: `12/34`
   - Any CVC: `123`

5. **Verify in database**:
   ```bash
   yarn db:studio
   ```
   - Check `bookings` table
   - Verify `ownerId` matches site owner
   - Verify `siteId` is 'site_0'
   - Check `status` is 'paid' after payment

## Multi-Site Support (Future)

This architecture supports multiple sites:
- Site 0: `agentverse884@gmail.com`
- Site 1: Different owner email
- Site 2: Different owner email

Each site has its own:
- Site ID (`site_0`, `site_1`, etc.)
- Owner user account
- Bookings collection
- Stripe account (via Connect)

## Security Notes

1. **Site Owner Password**: Auto-generated, should be changed
2. **Stripe Keys**: Use test keys for development
3. **Webhook Secret**: Required for production
4. **Database**: All queries filtered by `siteId`

## Monitoring

### Check Total Bookings
```bash
curl http://localhost:3000/api/bookings
```

### Check Site Owner Stats
```bash
curl http://localhost:3000/api/bookings/site-owner
```

## Deployment Checklist

- [x] Database schema with site support
- [x] Site owner auto-creation
- [x] All bookings linked to owner
- [x] Stripe payment integration
- [x] Webhook handling
- [x] Service selection
- [x] Date picker
- [x] Success page
- [ ] Email notifications (future)
- [ ] Admin dashboard (future)
- [ ] Multi-site management (future)

## Support

For issues or questions about Site 0:
- Check logs in Vercel dashboard
- Review database in Drizzle Studio
- Test webhooks with Stripe CLI
- Verify environment variables are set
