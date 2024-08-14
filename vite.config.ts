import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: mode === "development" ? 3000 : 80,
    },
  };
});
