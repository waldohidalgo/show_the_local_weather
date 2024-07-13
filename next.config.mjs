/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.freecodecamp.org",
        port: "",
        pathname: "/weather-icons/**",
      },
    ],
  },
};

export default nextConfig;
