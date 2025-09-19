/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
  },
  // Ensure API routes can access environment variables
  serverRuntimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Optional: Add some debugging
  experimental: {
    serverComponentsExternalPackages: ['@google/generative-ai'],
  },
};

export default nextConfig;