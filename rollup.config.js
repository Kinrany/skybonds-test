import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import replace from "rollup-plugin-replace";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.tsx",
  output: {
    file: "public/dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    replace({
      // https://github.com/rollup/rollup/issues/487
      "process.env.NODE_ENV": `'${production ? "production" : "development"}'`,
    }),
    nodeResolve(),
    commonjs(),
    typescript(),
    production && terser(),
    !production && serve("public"),
  ],
};
