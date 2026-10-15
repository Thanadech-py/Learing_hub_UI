import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // Listen on all interfaces (IPv4 + IPv6) so http://localhost, http://127.0.0.1,
    // and access from WSL/VM/remote hosts all work.
    host: true,
    port: 5173,
  },
});
