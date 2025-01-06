/** @type {import('next').NextConfig} */
const nextConfig = {
    // Existing rewrites and redirects
    async rewrites() {
        return [
            { source: "/settings/llms", destination: "/settings/llms/openai" },
            { source: "/settings", destination: "/settings/common" },
        ];
    },
};

export default nextConfig;
