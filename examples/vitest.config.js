import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    include: ['rules/**/*.test.jsx'],
    restoreMocks: true,
  },
});
