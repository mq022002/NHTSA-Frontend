/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index",
        permanent: true,
      },
    ];
  },
};

if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
  nextConfig.output = "export";
}

export default nextConfig;
