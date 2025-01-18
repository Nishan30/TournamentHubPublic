/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "media.npr.org",
            port: "",
          },
          {
            protocol: "https",
            hostname: "media.licdn.com",
            port: "",
          },
          {
            protocol: "http",
            hostname: "example.com",
            port: "",
          },
        ],
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
