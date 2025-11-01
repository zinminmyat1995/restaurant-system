import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

// Load environment variables from .env file
dotenv.config();

// Detect PHP availability (for local dev it should be true)
const hasPhp = (() => {
  try {
    execSync('php -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

// Disable Wayfinder on CI/Vercel or when explicitly turned off
const disableWayfinder =
  process.env.CI === 'true' || process.env.WAYFINDER_DISABLE === '1';

const includeWayfinder = !disableWayfinder && hasPhp;

if (!includeWayfinder) {
  console.log(
    '[vite] Wayfinder disabled (CI/WAYFINDER_DISABLE set or php not found).'
  );
}

export default defineConfig({
  server: {
    host: process.env.VITE_SERVER_HOST || 'localhost',
    hmr: {
      host: process.env.VITE_SERVER_HOST || 'localhost',
    },
  },
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    // Only include Wayfinder when available & allowed
    includeWayfinder && wayfinder({
      formVariants: true,
    }),
  ].filter(Boolean),
  esbuild: {
    jsx: 'automatic',
  },
});
