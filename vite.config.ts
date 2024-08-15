import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: mode === "development" ? 3000 : 80,
    },
    resolve: {
      alias: {
        // Add your path alias here
        src: path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom", // Use jsdom as the testing environment
      globals: true, // Optional: If you want to use global APIs like `describe`, `it`, etc., without importing them
      // setupFiles: "src/setupTests.ts", // Optional: You can specify a setup file for your tests
      alias: {
        src: path.resolve(__dirname, "./src"), // Make sure Vitest also knows about the alias
      },
    },
  };
});
