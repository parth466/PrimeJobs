import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  base: "/PrimeJobs", // 👈 this must match your repo name,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})