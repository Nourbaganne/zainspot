/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['prod.zainspot.com/'],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: false,
	distDir: 'client/.next'
};

export default nextConfig;
