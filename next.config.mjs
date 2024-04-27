/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
  nextConfig.redirects = async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  };
} else {
  nextConfig.output = "export";
}

export default nextConfig;
