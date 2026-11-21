import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Налаштування Vite для React. Під час локальної розробки шлях — /.
export default defineConfig({
  plugins: [react()],
});
