const webpack = require('webpack');
const paths = require('./paths');
const path = require('path');
const fs = require('fs');
const { resolve } = path;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const JSEntry = ['./src/js/client.js'];

module.exports = (env) => {
  const rules = [
    {
      test: /\.jsx?$/,
      include: resolve(__dirname, 'src'), // Avoid use of exclude
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
  ];
  if (env && env.APP_CONTEXT === 'ios') {
    console.log('   INTERFACE: IOS');
    rules.push(require('./dev/ios.config.js'));
  }

  if (env && env.APP_CONTEXT === 'android') {
    console.log('   INTERFACE: ANDROID');
    rules.push(require('./dev/android.config.js'));
  }

  return {
    entry: [...JSEntry],
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
      path: __dirname + '/src/compiled',
      filename: '[name].bundle.js',
      publicPath: '../../',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: paths.resolveFromRoot(
              'node_modules/web-ui-components/lib'
            ),
            from: '**/*.css',
            to: 'css',
          },
          {
            from: 'src/images',
            to: 'images',
          },
          {
            from: 'dev/config.json',
            to: 'config.json',
          },
        ],
      }),
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
    ],
    devServer: {
      contentBase: __dirname + '/src/compiled',
      open: true, // Open browser after compilation
      openPage:
        'securemessages/cb#access_token=access_token&bank_id=cb&client_context=CB%20Web&user_tracking_id=23453-34343-34343&brandId=vm&state=state&isDocumentLibraryEnabled=true',
      historyApiFallback: {
        rewrites: [{ from: /^\/$/, to: 'index.html' }],
      },
      host: 'localhost',
      port: 8080,
      hot: true,
    },
    module: {
      rules,
    },
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.json', '.scss', '.css'],
    },
  };
};
