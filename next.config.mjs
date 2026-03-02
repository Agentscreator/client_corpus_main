/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable body parsing for Stripe webhooks
  async headers() {
    return [
      {
        source: '/api/webhooks/stripe',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
