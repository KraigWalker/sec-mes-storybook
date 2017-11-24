const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const brand = process.env.brand;
const brandEntry = ["babel-polyfill","./src/scss/main.scss"];
const noBrandEntry = ["babel-polyfill","./src/js/client.js"];

console.log(brand);

module.exports = {
  entry: brand?brandEntry:noBrandEntry,
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
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: "$brand: "+brand+";$env: prod;"
                        }
                    }
                ]
            }),
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(jpg|jpeg|gif|png|svg)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "src/images/"),
            loader:'url-loader?limit=1024&name=images/[name].[ext]'
          },
          {
            test: /\.(otf|ttf|eot|svg)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "src/fonts/"),
            loader: 'url-loader?limit=1024&name=compiled/fonts/[name].[ext]'
          }

      ]
  },
    plugins: [
        new ExtractTextPlugin(brand+'.[name].css', { allChunks: true })
    ],

};