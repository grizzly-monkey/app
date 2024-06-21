export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
  },
  moduleFileExtensions: [
    "scss",
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "scss",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  setupFilesAfterEnv: ['<rootDir>/src/__ tests __/demo.test.tsx'],
};
