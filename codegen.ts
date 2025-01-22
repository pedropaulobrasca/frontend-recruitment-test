import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
  documents: ["src/services/graphql/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
        exporFragmentSpreadSubTypes: true,
        documentMode: "graphQLTag",
      },
    },
  },
};

export default config;
