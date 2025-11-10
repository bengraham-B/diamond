/** @type {import('next').NextConfig} */
 
const nextConfig = {
	sassOptions: {
		additionalData: 
		`
			$var: red;
			$primary: blue;
			$diamond-light-blue: #00bfff;
			$black: #19253d;
		`
		,
	},
}
 
module.exports = nextConfig
