const webpack = require('webpack');
const { resolve } = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const JSEntry = ['whatwg-fetch', './src/js/client.js'];

module.exports = {
  entry: [...JSEntry],
  mode: 'production',
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '',
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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      excludeChunks: ['undefined.main', 'main'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          keep_fnames: true,
          mangle: false,
        },
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
              '@babel/preset-react',
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
