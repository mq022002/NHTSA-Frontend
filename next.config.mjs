/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
  nextConfig.output = "export";
}

export default nextConfig;
