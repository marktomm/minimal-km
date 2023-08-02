import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    hmr: {
      protocol: "ws",
      host: "nginx",
      clientPort: 80,
      path: "dws",
    },
    // websocketServer: 'ws://node_front',
    proxy: {
      "/api": {
        target: "http://node_back:3000",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "http://node_back:3000",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
      "/assets": {
        target: "http://nginx",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
