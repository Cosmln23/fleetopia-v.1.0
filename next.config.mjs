/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint-ul rulează separat în pipeline; nu bloca build-ul Next
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
