import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { bookingId, amount } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify booking exists
    const existingBooking = await db.select().from(bookings).where(eq(bookings.id, parseInt(bookingId)));
    
    if (!existingBooking.length) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: bookingId.toString(),
      },
    });

    // Update booking with payment intent ID
    await db.update(bookings)
      .set({ stripePaymentIntentId: paymentIntent.id })
      .where(eq(bookings.id, parseInt(bookingId)));

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
