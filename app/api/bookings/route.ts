import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, clientName, clientEmail, service, price, bookingDate } = body;

    const booking = await db.insert(bookings).values({
      userId,
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
    const allBookings = await db.select().from(bookings);
    return NextResponse.json(allBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
