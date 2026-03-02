'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success`,
      },
    });

    if (error) {
      setMessage(error.message || 'An error occurred');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </Button>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = parseFloat(searchParams.get('amount') || '0');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!bookingId || !amount) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [bookingId, amount]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>Secure payment powered by Stripe</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutForm amount={amount} />
        </CardContent>
      </Card>
    </Elements>
  );
}

export default function PaymentPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
