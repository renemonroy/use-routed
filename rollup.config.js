import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import url from "rollup-plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    url({ exclude: ["**/*.svg"] }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    babel({
      extensions: [".tsx"],
      exclude: ["node_modules/**", "./src/__tests__"],
      presets: ["@babel/env", "@babel/preset-react"]
    }),
    commonjs()
  ]
};
