import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
]
const verifyIfExternal = (moduleName) => externals.some((lib) => moduleName.startsWith(lib))

export default {
  input: `${__dirname}/src/index.js`,
  external: verifyIfExternal,
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'react',
        [
          'env',
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
      plugins: [
        'external-helpers',
        'transform-object-rest-spread',
        'transform-class-properties',
        'transform-export-extensions',
      ],
    }),
    resolve({ modulesOnly: true }),
    commonjs(),
  ],
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
}
