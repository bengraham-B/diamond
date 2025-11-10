/** @type {import('next').NextConfig} */
 
const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}
 
module.exports = nextConfig
