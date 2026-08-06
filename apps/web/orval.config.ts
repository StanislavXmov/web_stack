import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:3005/api-docs-json",
    output: {
      target: "./src/generated/api.ts",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "http://localhost:3005",
      override: {
        mutator: {
          path: "./src/lib/api-fetch.ts",
          name: "customFetch",
        },
        fetch: {
          forceSuccessResponse: true,
        },
      },
    },
  },
  apiZod: {
    input: "http://localhost:3005/api-docs-json",
    output: {
      target: "./src/generated/api.zod.ts",
      client: "zod",
      httpClient: "fetch",
      baseUrl: "http://localhost:3005",
    },
  },
});
