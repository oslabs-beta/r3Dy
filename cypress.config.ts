import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'khba11',
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
