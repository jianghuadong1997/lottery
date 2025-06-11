import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 确保正确处理JSX文件
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  
  // 开发服务器配置
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          styled: ['styled-components'],
        }
      }
    }
  },
  
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  },
  
  // 环境变量前缀
  envPrefix: 'VITE_',
  
  // 为Electron优化
  base: './',
  
  // CSS配置
  css: {
    devSourcemap: true,
  },
  
  // 优化依赖
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'styled-components'
    ]
  }
}) 