/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },

  // 腾讯云 Pages 静态托管必须开启 trailingSlash，
  // 确保 /about → /about/index.html 正确匹配
  trailingSlash: true,

  // 禁用 x-powered-by 响应头，减小体积
  poweredByHeader: false,

  // 生产级压缩
  compress: true,

  // 实验性优化：减少客户端 JS 大小
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'react-icons',
      '@tabler/icons-react',
    ],
  },
};

export default nextConfig;
