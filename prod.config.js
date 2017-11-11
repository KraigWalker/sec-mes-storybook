const webpack = require('webpack');

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