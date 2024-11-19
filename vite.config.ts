import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@libsql/client']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  define: {
    'process.env.VITE_TURSO_DB_URL': JSON.stringify(process.env.VITE_TURSO_DB_URL),
    'process.env.VITE_TURSO_DB_AUTH_TOKEN': JSON.stringify(process.env.VITE_TURSO_DB_AUTH_TOKEN)
  }
});