/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wordpress-1282918-4646875.cloudwaysapps.com'
			}
		]
		
	}
};

export default nextConfig;
