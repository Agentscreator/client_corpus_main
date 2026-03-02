import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Site owner email - all bookings belong to this user
const SITE_OWNER_EMAIL = 'agentverse884@gmail.com';
const SITE_ID = 'site_0';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, service, price, bookingDate } = body;

    // Get or create site owner
    let owner = await db.select().from(users).where(eq(users.email, SITE_OWNER_EMAIL)).limit(1);
    
    if (!owner.length) {
      // Create site owner if doesn't exist
      const newOwner = await db.insert(users).values({
        name: 'Site Owner',
        email: SITE_OWNER_EMAIL,
        password: 'placeholder', // Should be hashed in production
        stripeConnected: false,
      }).returning();
      owner = newOwner;
    }

    const ownerId = owner[0].id;

    // Create booking linked to site owner
    const booking = await db.insert(bookings).values({
      siteId: SITE_ID,
      ownerId,
      clientName,
      clientEmail,
      service,
      price,
      bookingDate: new Date(bookingDate),
    }).returning();

    return NextResponse.json(booking[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get all bookings for this site
    const allBookings = await db.select().from(bookings).where(eq(bookings.siteId, SITE_ID));
    return NextResponse.json(allBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
