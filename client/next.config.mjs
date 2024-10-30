/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: false,
};

export default nextConfig;
