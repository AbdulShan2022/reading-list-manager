import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on) {
      // Example: define a custom task
      on("task", {
        log(message: string) {
          console.log(message);
          return null;
        }
      });
    },
  },
});

