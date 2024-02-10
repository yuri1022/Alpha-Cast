import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 添加這一行，表示基本路徑為根路徑
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src', // 將 '@' 設置為你的 'src' 路徑
      
    },
  },
   server: {
    proxy: {
      '/api':{
        target:'http://localhost:3000', // 將所有以 '/api' 開頭的請求代理到你的伺服器端 API
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      } 
    },
  },
});
