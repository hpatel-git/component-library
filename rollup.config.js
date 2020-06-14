import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import packageJson from "./package.json";
const emoji = require("node-emoji");
const fse = require("fs-extra");
const mostly_sunny = emoji.get("mostly_sunny");
const boom = emoji.get("boom");

/* Below override generate .d.ts files for all the modules */

let override = {
  compilerOptions: { declaration: true },
  exclude: ["./src/__mocks__/**/*"],
};

console.log(`${mostly_sunny} Building running version ${packageJson.version}`);

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["axios"],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: "node_modules/**",
    }),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: override,
    }),
    terser(),
  ],
};

const copyPackageJson = () => {
  const {
    scripts,
    devDependencies,
    husky,
    release,
    files,
    ...distPackageData
  } = packageJson;

  const newPackageData = {
    ...distPackageData,
    private: false,
  };

  fse.outputFile(
    "build/package.json",
    JSON.stringify(newPackageData, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          `${boom} package.json copied with version ${packageJson.version}`
        );
      }
    }
  );
};

copyPackageJson();
