/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: 'standalone',
  transpilePackages: ['shiki'],

  // Pin the workspace root. A stray package-lock.json in the user's home dir
  // otherwise makes Turbopack infer the wrong root and emit a warning.
  turbopack: {
    root: import.meta.dirname,
  },
  
  // Image optimization. `images.domains` was removed in Next 16 — remotePatterns
  // is the replacement and is stricter (protocol + pathname are explicit).
  images: {
    remotePatterns: [
      "lh3.googleusercontent.com",
      "img.freepik.com",
      "images.pexels.com",
      "source.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
      "genie.arihantcodes.com",
      "www.shadcnblocks.com",
    ].map((hostname) => ({ protocol: 'https', hostname, pathname: '/**' })),
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
  },

  // Promoted out of `experimental` in Next 15; it is a top-level key in Next 16.
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
      '/sitemap.xml': [
        './app/**/page.tsx',
        './content/blog/*.tsx',
        './content/component-catalog.json',
        './public/agents.md',
        './public/llms*.txt',
      ],
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
    // NOTE: /_next/static is deliberately NOT listed here. Next already serves it
    // with `max-age=31536000, immutable`, and overriding it makes Next 16 warn
    // that the custom header can break dev behaviour.
    ...(process.env.NODE_ENV === 'production' ? [
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

export default nextConfig;
