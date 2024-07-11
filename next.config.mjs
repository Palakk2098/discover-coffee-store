/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
  env: {
    FOURSQUARE_API_TOKEN: 'fsq3Nz2+KdsKCkIlJm8evAWlcWgPpLwdiF3bayNh0Kjn4SQ=',
    UNSPLASH_ACCESS_KEY: 'FJizcTQUCTFbDWWLr5GcgYREhhDwr8pLdxgdokOc5M4',
  },
  
};

export default nextConfig;
