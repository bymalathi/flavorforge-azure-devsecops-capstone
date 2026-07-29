import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log("MODE =", mode);
  console.log("ENV =", env);

  return {
    plugins: [react()],
    define: {
      __API__: JSON.stringify(env.VITE_API_BASE_URL),
    },
  };
});