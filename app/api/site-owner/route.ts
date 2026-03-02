import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const SITE_OWNER_EMAIL = 'agentverse884@gmail.com';

export async function GET() {
  try {
    // Check if site owner exists
    let siteOwner = await db.select().from(users).where(eq(users.email, SITE_OWNER_EMAIL));

    // If not exists, create site owner
    if (!siteOwner.length) {
      const hashedPassword = await bcrypt.hash('default-password-change-me', 10);
      
      const newOwner = await db.insert(users).values({
        name: 'Site Owner',
        email: SITE_OWNER_EMAIL,
        password: hashedPassword,
        phone: null,
        stripeAccountId: null,
        stripeConnected: false,
      }).returning();

      siteOwner = newOwner;
    }

    return NextResponse.json({ 
      id: siteOwner[0].id,
      email: siteOwner[0].email,
      name: siteOwner[0].name
    });
  } catch (error) {
    console.error('Error fetching/creating site owner:', error);
    return NextResponse.json({ error: 'Failed to get site owner' }, { status: 500 });
  }
}
