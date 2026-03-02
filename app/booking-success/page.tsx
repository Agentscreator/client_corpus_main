import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your payment was successful and your appointment has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email shortly with all the details.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
