// vite.config.js
import { defineConfig } from "vite";
import { sync } from "glob";

// Fix for Windows path slashes
const input = sync("./src/**/*.html").map(file => file.replace(/\\/g, "/"));

export default defineConfig({
    root: "./src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input,
        },
    },
});