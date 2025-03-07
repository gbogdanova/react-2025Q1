import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/App.tsx',
      ],
      // lines: 70, // Minimum coverage threshold
      //    functions: 70,
      //    branches: 70,
      //    statements: 70,
      reporter: ['text', 'html'], // Generates text and HTML reports
    },
  },
});

process.env.NEXT_PUBLIC_DISABLE_ERROR_OVERLAY = 'true';
