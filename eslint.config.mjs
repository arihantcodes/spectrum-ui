import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";

// eslint-config-next v16 ships native flat config, so it is spread directly —
// wrapping it in FlatCompat throws on the circular plugin references.
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "packages/mcp-server/dist/**",
    ],
  },
  ...nextCoreWebVitals,
  {
    plugins: { "unused-imports": unusedImports },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },
];

export default eslintConfig;
