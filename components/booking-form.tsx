'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  bookingDate: z.date({ required_error: 'Please select a date' }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const services = [
  { name: 'Basic Manicure', price: 25 },
  { name: 'Gel Manicure', price: 45 },
  { name: 'Basic Pedicure', price: 35 },
  { name: 'Gel Pedicure', price: 55 },
  { name: 'Acrylic Full Set', price: 65 },
  { name: 'Nail Art', price: 15 },
];

export function BookingForm() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const bookingDate = watch('bookingDate');

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedService) {
      alert('Please select a service');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: null, // Guest booking - can be updated with auth later
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          service: selectedService.name,
          price: selectedService.price.toString(),
          bookingDate: data.bookingDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const booking = await response.json();

      if (!booking.id) {
        throw new Error('Invalid booking response');
      }

      // Redirect to payment page
      window.location.href = `/payment?bookingId=${booking.id}&amount=${selectedService.price}`;
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Your Appointment</CardTitle>
        <CardDescription>Fill in your details to schedule your nail service</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientName">Full Name</Label>
            <Input
              id="clientName"
              {...register('clientName')}
              placeholder="John Doe"
            />
            {errors.clientName && (
              <p className="text-sm text-red-500">{errors.clientName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              {...register('clientEmail')}
              placeholder="john@example.com"
            />
            {errors.clientEmail && (
              <p className="text-sm text-red-500">{errors.clientEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select
              onValueChange={(value) => {
                const service = services.find(s => s.name === value);
                setSelectedService(service || null);
                setValue('service', value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.name} value={service.name}>
                    {service.name} - ${service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-sm text-red-500">{errors.service.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Booking Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !bookingDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingDate ? format(bookingDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={(date) => date && setValue('bookingDate', date)}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.bookingDate && (
              <p className="text-sm text-red-500">{errors.bookingDate.message}</p>
            )}
          </div>

          {selectedService && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Total: ${selectedService.price}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
