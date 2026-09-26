module.exports = {
    transform: {
        '^.+\\.tsx?$': '@swc/jest', // Uses fast Rust compilation for tests
    },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };