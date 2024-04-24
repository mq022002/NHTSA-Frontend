/** @type {import('next').NextConfig} */
const nextConfig = {
  output:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "export" : "server",
};

export default nextConfig;
