/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
	reactStrictMode: false, // console 불필요하게 중복으로 찍히는거 방지
	sassOptions: {
		includePath: [path.join(__dirname, 'styles')],
		prependData: `@import "styles/_variables.scss";`
	},
	images: {
		domains: ['www.themealdb.com', 'images.unsplash.com']
	},
	compiler: { styledComponents: true }
};

module.exports = nextConfig;
