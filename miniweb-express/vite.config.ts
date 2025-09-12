import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // ✅ Este import faltaba

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
});
