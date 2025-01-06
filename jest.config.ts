import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  testMatch: ["<rootDir>/src/**/*.test.(ts|js)"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["node_modules"],
};

export default config;
