/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // Ensure no HTML files are handled incorrectly
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // This allows images from all paths on the domain
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // This allows any path under the domain
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '', // leave empty if not using a specific port
        pathname: '/**', // This allows all paths under this hostname
      },
      // Add other patterns as needed
    ],
  },
};

export default nextConfig;
