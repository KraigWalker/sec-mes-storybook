import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';

import pkgJSON from './package.json';

export default {
  input: `${__dirname}/src/index.js`,
  external: [
    /** Treat any path-based imports (e.g web-ui-components/atoms/text/etc) as external */
    /@babel\/runtime/,
    /web-ui-components/,
    /** Treat any module depencies as external; provided by the web app build process that uses this lib. */
    ...Object.keys(pkgJSON.dependencies),
    ...Object.keys(pkgJSON.peerDependencies),
  ],
  plugins: [
    /** @todo replace nodeResolve with actual ES Style exports accross the codebase to improve clarity  */
    nodeResolve(),
    postcss({
      /** @note autoprefix must be @9.x.x until this PR is merged into a new `rollup-plugin-postcss` release:  */
      plugins: [autoprefixer()],
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
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
        '@babel/proposal-object-rest-spread',
        '@babel/proposal-class-properties',
        '@babel/transform-runtime',
      ],
    }),
    commonjs(),
  ],
  output: [
    {
      format: 'cjs',
      file: pkgJSON.main,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
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
            '@babel/proposal-object-rest-spread',
            '@babel/proposal-class-properties',
            '@babel/transform-runtime',
          ],
        }),
        terser(),
      ],
    },
    {
      format: 'esm',
      file: pkgJSON.module,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
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
            '@babel/proposal-object-rest-spread',
            '@babel/proposal-class-properties',
            '@babel/transform-runtime',
          ],
        }),
        terser(),
      ],
    },
  ],
};
