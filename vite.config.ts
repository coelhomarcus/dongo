import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        electron([
            {
                entry: "electron/main.ts", // seu processo main
            },
            {
                entry: "electron/preload.ts", // preload script
                onstart(options) {
                    // Rebuild preload script on change
                    options.reload();
                },
            },
        ]),
        renderer(), // Adiciona suporte para APIs do Electron no renderer
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
