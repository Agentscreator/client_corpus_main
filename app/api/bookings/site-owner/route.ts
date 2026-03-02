import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const SITE_OWNER_EMAIL = 'agentverse884@gmail.com';

// Get all bookings for site owner
export async function GET(req: NextRequest) {
  try {
    // Get site owner
    const siteOwner = await db.select().from(users).where(eq(users.email, SITE_OWNER_EMAIL));

    if (!siteOwner.length) {
      return NextResponse.json({ error: 'Site owner not found' }, { status: 404 });
    }

    // Get all bookings for this site owner
    const ownerBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.siteOwnerId, siteOwner[0].id));

    return NextResponse.json({
      siteOwner: {
        id: siteOwner[0].id,
        email: siteOwner[0].email,
        name: siteOwner[0].name,
      },
      bookings: ownerBookings,
      totalBookings: ownerBookings.length,
      paidBookings: ownerBookings.filter(b => b.status === 'paid').length,
    });
  } catch (error) {
    console.error('Error fetching site owner bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
