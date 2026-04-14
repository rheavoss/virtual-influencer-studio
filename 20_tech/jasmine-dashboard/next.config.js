/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // When accessed from the investor domain, redirect root to /5
      {
        source: '/',
        has: [{ type: 'host', value: 'virtual-influencer-dashboard5.vercel.app' }],
        destination: '/5',
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
