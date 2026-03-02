// Site configuration
export const SITE_ID = 'site_0';
export const SITE_OWNER_EMAIL = 'agentverse884@gmail.com';
export const SITE_OWNER_NAME = 'Site Owner';

// All bookings and payments are connected to this user

// Services offered
export const SERVICES = [
  { id: 1, name: 'Basic Manicure', price: 25, description: 'Classic nail care and polish' },
  { id: 2, name: 'Gel Manicure', price: 45, description: 'Long-lasting gel polish' },
  { id: 3, name: 'Basic Pedicure', price: 35, description: 'Foot care and polish' },
  { id: 4, name: 'Gel Pedicure', price: 55, description: 'Long-lasting gel pedicure' },
  { id: 5, name: 'Acrylic Full Set', price: 65, description: 'Full set of acrylic nails' },
  { id: 6, name: 'Nail Art', price: 15, description: 'Custom nail designs' },
];

export type Service = typeof SERVICES[number];
