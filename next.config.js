const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self';",
  },
]
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'dummyimage.com',
      'www.relysia.com',
      'upload.wikimedia.org',
      'localhost',
    ],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
