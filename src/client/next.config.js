const withFlowbiteReact = require("flowbite-react/plugin/nextjs");

/** @type {import('next').NextConfig} */
 
const nextConfig = {
	sassOptions: {
		additionalData: 
		`
			$var: red;
			$primary: #229fa9;
			$diamond-light-blue: #00bfff;
			$black: #19253d;

			$background: #FAF9F6;
			$accent: #00bfff;
			$secondary: #222533;
		`
		,
	},
}
 
module.exports = withFlowbiteReact(nextConfig)