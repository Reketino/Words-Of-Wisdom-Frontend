/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/quote',           // URL frontend kaller
        destination: 'http://127.0.0.1:5000/quote', // Flask-backend
      },
    ];
  },
};

export default nextConfig;
