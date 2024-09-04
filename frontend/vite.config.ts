import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@reducers": join(__dirname, "src/redux/reducers"),
      "@sagas": join(__dirname, "src/redux/sagas"),
    },
  },
});
