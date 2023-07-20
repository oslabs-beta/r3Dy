module.exports = {
  preset: 'ts-jest',
  // Indicates the root directory for running Jest tests
  rootDir: '.',

  // The file extensions Jest will look for
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // The patterns Jest will use to ignore specific files and directories
  testPathIgnorePatterns: ['/node_modules/'],

  // The test environment that will be used for running tests
  testEnvironment: 'jest-environment-jsdom',

  // The setup files that will be run before Jest tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transform files with Babel to enable JSX and ES6 syntax support
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
