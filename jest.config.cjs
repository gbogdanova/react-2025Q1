//export { };
module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testMatch: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^.+\\.(ts|tsx)$': '<rootDir>/src/components/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true,
};
