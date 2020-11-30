const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const { resolve } = path;
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;*/

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const JSEntry = ['./src/js/client.js'];

module.exports = {
  entry: [...JSEntry],
  mode: 'production',
  output: {
    path: resolveApp('build'),
    pathinfo: false,
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '../../',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    /** @todo dynamically import the correct theme */
    new CopyWebpackPlugin({
      patterns: [
        {
          context: paths.resolveFromRoot('node_modules/web-ui-components/lib'),
          from: '**/*.css',
          to: 'css',
        },
        {
          from: 'src/images',
          to: 'images',
        },
      ],
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          /** @todo: change to a "public" folder to mirror CRA */
          template: resolveApp('src/index.html'),
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      name: false,
      minSize: 1,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: false,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              [
                '@babel/preset-env',
                {
                  modules: false,
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
                },
              ],
            ],
            plugins: [
              '@babel/proposal-object-rest-spread',
              '@babel/proposal-class-properties',
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  absoluteRuntime: true,
                  version: '7.12.5',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.json$/,
        exclude: ['/node_modules/'],
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json', '.scss', '.css'],
  },
};
