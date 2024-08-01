/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  setupFiles: ['./jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', { tsconfig: './src/__tests__/tsconfig.json' }],
  },
  moduleNameMapper: {
    '^../workers/worker\\.ts\\?worker$': '<rootDir>/src/workers/worker.ts',
  },
};
