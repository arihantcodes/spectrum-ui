/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: 'standalone',
  transpilePackages: ['shiki'],
  
  // Image optimization
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.freepik.com",
      "images.pexels.com",
      "source.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations (optimizeCss disabled — breaks CSS HMR in dev)
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    outputFileTracingIncludes: {
      '/docs/**/*': [
        './app/(docs)/docs/**/*.tsx',
        './components/ui/**/*.tsx',
        './components/ui/**/*.ts',
        './components/spectrumui/**/*.tsx',
        './app/registry/**/*.tsx',
        './lib/**/*.ts',
      ],
      '/(docs)/docs/**/*': [
        './app/(docs)/docs/**/*.tsx',
        './components/ui/**/*.tsx',
        './components/ui/**/*.ts',
        './components/spectrumui/**/*.tsx',
        './app/registry/**/*.tsx',
        './lib/**/*.ts',
      ],
    },
  },

  // Compression
  compress: true,

  // Cache headers — aggressive caching in production, no caching in dev
  headers: async () => [
    // Security headers for all routes
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // In development: tell browser never to cache pages or JS so HMR works
        ...(process.env.NODE_ENV !== 'production' ? [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ] : []),
      ],
    },
    // Fonts are content-hashed — safe to cache forever in all environments
    {
      source: '/fonts/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    // Static JS/CSS chunks — production only (content-hashed, safe to cache forever)
    ...(process.env.NODE_ENV === 'production' ? [
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|webp|svg|ico|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ] : []),
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
