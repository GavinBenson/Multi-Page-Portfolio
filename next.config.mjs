import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
