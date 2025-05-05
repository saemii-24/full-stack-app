// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Additional setup before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file

  // if using TypeScript with a baseUrl set to the root directory, this helps alias to work
  moduleDirectories: ["node_modules", "<rootDir>/"],

  // Jest environment setting
  testEnvironment: "jest-fixed-jsdom",

  // Transforms for TypeScript and JSX
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  // Ignore node_modules and .next folders during transformation
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  // Define test file patterns

  testMatch: [
    "<rootDir>/**/*.test.(js|jsx|ts|tsx)", // .test 파일
    "<rootDir>/**/*.spec.(js|jsx|ts|tsx)", // .spec 파일
  ],

  // Mocking CSS, images, and aliases for module imports
  moduleNameMapper: {
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js", // Mock CSS files
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy", // CSS modules mock
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
      "<rootDir>/__mocks__/fileMock.js", // Mock images

    "^@/(.*)$": "<rootDir>/src/$1",
    "^@query/(.*)$": "<rootDir>/src/query/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
  },

  // Add global configurations for TypeScript
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json", // Specify Jest-specific tsconfig
    },
  },
};

// Create Jest config to load Next.js config asynchronously
module.exports = createJestConfig(customJestConfig);
