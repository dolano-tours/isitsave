module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageProvider: "babel",
  modulePathIgnorePatterns: [
    "build",
    "dist",
    "node_modules"
  ]
};