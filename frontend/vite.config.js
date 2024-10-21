import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // changes the origin of the host header to the target URL
        secure: false, // set to true if your backend uses HTTPS
      },
    },
  },
});
