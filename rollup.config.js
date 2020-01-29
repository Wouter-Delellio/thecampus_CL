import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import prettier from "rollup-plugin-prettier";

import pkg from "./package.json";

export default {
    input: "src/index.js",
    output: [
        {
            file: pkg.module,
            format: "esm",
            exports: "named",
            sourcemap: true,
        },
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        prettier({ parser: "babel" }),
        postcss({
            modules: true,
        }),
        babel({
            exclude: "node_modules/**",
        }),
    ],
    external: ["react", "react-dom"],
};
