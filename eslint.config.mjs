import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Debug utilities - not part of the app
    "debug.cjs",
    "debug_sm.cjs",
    "parse_output.cjs",
    "gen_output.py",
    "step_output.json",
    "references/**",
    "stitch/**",
    ".stitch",
  ]),
]);

export default eslintConfig;
