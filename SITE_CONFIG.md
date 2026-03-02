# Site Configuration

## Site Identity
- **Site ID**: `site_0`
- **Owner Email**: `agentverse884@gmail.com`
- **Owner Name**: Site Owner

## Booking System

### How It Works
1. **Customer books a service** - Fills out booking form with their details
2. **Booking is created** - Automatically linked to site owner (agentverse884@gmail.com)
3. **Payment is processed** - Stripe payment connected to site owner's account
4. **Booking is confirmed** - Status updated to "paid" via webhook

### Database Schema

#### bookings table
- `id` - Unique booking ID
- `siteId` - Always "site_0" for this site
- `ownerId` - References user with email agentverse884@gmail.com
- `clientName` - Customer's name
- `clientEmail` - Customer's email
- `service` - Selected service
- `price` - Service price
- `status` - pending | paid | completed
- `stripePaymentIntentId` - Stripe payment tracking
- `bookingDate` - Appointment date/time
- `createdAt` - When booking was created

### All Transactions Connected to Owner
Every booking and payment is automatically linked to:
- **User**: agentverse884@gmail.com
- **Site**: site_0

This ensures:
- All revenue is tracked to the site owner
- Stripe payments are connected to the owner's account
- Easy reporting and analytics per site
- Multi-site support (can add site_1, site_2, etc.)

### Services Available
1. Basic Manicure - $25
2. Gel Manicure - $45
3. Basic Pedicure - $35
4. Gel Pedicure - $55
5. Acrylic Full Set - $65
6. Nail Art - $15

### Payment Flow
1. Customer selects service and date
2. Booking created with `ownerId` = agentverse884@gmail.com user ID
3. Stripe PaymentIntent created with metadata:
   - `bookingId`
   - `siteId: "site_0"`
   - `ownerEmail: "agentverse884@gmail.com"`
   - Customer details
4. Payment processed through Stripe
5. Webhook updates booking status to "paid"

### Viewing Bookings
All bookings for this site can be retrieved via:
```bash
GET /api/bookings
```

This returns only bookings where `siteId = "site_0"`

### Owner Account
The system automatically creates/uses the owner account:
- Email: agentverse884@gmail.com
- All bookings reference this user's ID
- All Stripe payments include owner metadata
