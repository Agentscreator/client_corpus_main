import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

// Disable body parsing for webhook
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const bookingId = paymentIntent.metadata.bookingId;

      if (bookingId) {
        try {
          await db.update(bookings)
            .set({ status: 'paid' })
            .where(eq(bookings.id, parseInt(bookingId)));
          console.log(`Booking ${bookingId} marked as paid`);
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedIntent.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
