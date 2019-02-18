import commonjs from "rollup-plugin-commonjs";
import multiEntry from "rollup-plugin-multi-entry";
import json from "rollup-plugin-json";
import sass from "rollup-plugin-sass";
import babel from "rollup-plugin-babel";

const webUIExternals = {
  global: ["layout"],
  organisms: ["global", "modals", "cards", "takeovers"],
  atoms: ["buttons", "iconography", "forms"],
  utilities: ["themes"],
  navigation: ["tab-cards"]
};

const webUIExternalsFlat = Object.keys(webUIExternals).reduce((externals, curr) => {
  return [...externals, ...webUIExternals[curr].map(lib => `web-ui-components/lib/${curr}/${lib}`)];
}, []);

export default [
  {
    input: "./src/index.js",
    output: {
      file: "./lib/index.js",
      format: "cjs"
    },
    plugins: [
      babel({
        babelrc: false,
        presets: [
          'react',
          ['env',
            {
              targets: {
                browsers: [
                  'IE 11',
                  'last 3 Chrome versions',
                  'last 2 Edge versions',
                  'last 2 Firefox versions',
                  'last 2 Safari versions',
                  'last 2 ChromeAndroid versions',
                  'last 2 iOS versions',
                ],
              },
              modules: false,
            },
          ],
        ],
        plugins: ['transform-object-rest-spread', 'transform-class-properties'],
      }),
      commonjs(),
      multiEntry(),
      json()
    ],
    external: [
      "moment",
      "prop-types",
      "react-hot-loader",
      "react-router-dom",
      "react-redux",
      "reselect",
      "react",
      "redux",
      "react-dom",
      "react-router",
      "redux-thunk",
      ...webUIExternalsFlat
    ]
  },
  ...["CB", "YB", "DYB"].map(brand => ({
    input: "./src/scss/main.js",
    output: {
      format: "cjs",
      file: "./lib/scss.js",
    },
    plugins: [
      sass({
        options: {
          data: `$brand: ${brand};$env: prod;`
        },
        output: `./lib/app.${brand}.css`,
      })
    ]
  })),
];
