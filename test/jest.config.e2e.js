const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('../tsconfig');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: 'e2e.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: '../',
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
