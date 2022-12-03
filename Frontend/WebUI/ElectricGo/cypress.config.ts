import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ehm1ni',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
