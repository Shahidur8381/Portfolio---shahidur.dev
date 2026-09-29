/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.shahidur.dev",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.shahidur.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
  async redirects() {
    return [
      // Shorthand aliases redirect to dynamic /contact/:platform handler (which fetches latest URLs from backend)
      {
        source: "/telegram",
        destination: "/contact/telegram",
        permanent: false,
      },
      {
        source: "/whatsapp",
        destination: "/contact/whatsapp",
        permanent: false,
      },
      {
        source: "/github",
        destination: "/contact/github",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "/contact/linkedin",
        permanent: false,
      },
      {
        source: "/leetcode",
        destination: "/contact/leetcode",
        permanent: false,
      },
      {
        source: "/codeforces",
        destination: "/contact/codeforces",
        permanent: false,
      },
      {
        source: "/email",
        destination: "/contact/email",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
