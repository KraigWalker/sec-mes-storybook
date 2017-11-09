const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var path = require('path');
// const merge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const baseConfig = require('./base.config.js');


module.exports = {
  entry: ["babel-polyfill","./src/js/client.js"],
  output: {
      path:__dirname+ '/src/compiled/',
      filename: "[name].bundle.js",
      publicPath: '/'
  },
  module: {
      rules: [
          {
              test: /\.jsx?$/,
              exclude:/node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
              }
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(jpg|jpeg|gif|png|svg)$/,
            exclude: /node_modules/,
            loader:'url-loader?limit=1024&name=images/[name].[ext]'
          },
          {
            test: /\.(otf|ttf|eot)$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
          }

      ]
  }

};



// module.exports = {
//   resolve: {
//     modules: [
//           path.join(__dirname, "src"),
//         "node_modules"
//       ]
//     },
//     entry: "./js/client.js",
//     resolve: {
//       extensions: ['', '.js', '.jsx']
//     },
//   output: {
//     path: __dirname + "/src/compiled/",
//     filename: '[name].bundle.[chunkhash].js'
//   },

//   module: {
//     rules: [
//         {
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loader: "babel-loader",
//             query: {
//               presets: ['react', 'es2015', 'stage-0'],
//               plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
//             }
//           },
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             'css-loader', 'scss-loader'
//           ],
//         }),
//       },
//     ],
//   },

//   plugins: [
//     // Extract imported CSS into own file
//     new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
//     // Minify JS
//     new webpack.optimize.UglifyJsPlugin({ warnings: false,sourceMap: true,
//         compress: true, }),
//     // Minify CSS
//     // new webpack.LoaderOptionsPlugin({
//     //   minimize: true,
//     // }),
//   ],
// };