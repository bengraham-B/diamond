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
		`
		,
	},
}
 
module.exports = withFlowbiteReact(nextConfig)