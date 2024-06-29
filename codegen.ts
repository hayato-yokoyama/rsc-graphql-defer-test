import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql-pokemon2.vercel.app",
  documents: ["app/**/*.tsx", "components/**/*.tsx"],
  generates: {
    "gpl/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
