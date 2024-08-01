import { defineConfig } from 'cypress';

export default defineConfig({
  server: {
    host: '127.0.0.1',
  },
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {},
  },
});
