import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://aryan29092003.github.io/Portfolio/
// If you later move to a custom domain or a user site, change base to '/'.
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: { target: 'es2022', sourcemap: false },
});
