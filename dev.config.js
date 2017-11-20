const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: ["babel-polyfill","./src/js/client.js"],
  devtool: 'inline-source-map',
  output: {
      path:__dirname+ '/src/compiled/local/',
      filename: "[name].bundle.js",
      publicPath: '/'
  },
  plugins: [    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    ],
  devtool: "source-map",
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
                loader: "style-loader", 
                options: {
                  sourceMap: true
                } // creates style nodes from JS strings
            }, {
                loader: "css-loader", 
                options: {
                  sourceMap: true
                } // translates CSS into CommonJS
            }, {
                loader: "sass-loader", 
                options: {
                  sourceMap: true
                }// compiles Sass to CSS
            }]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          { 
            test: /\.(png|woff|woff2|eot|ttf|svg|otf|gif)$/, 
            loader: 'url-loader' 
          }

      ]
  },
  devServer: {
    contentBase: __dirname +"/src/",
    compress: true,
    inline: true,
    open: true,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    port: 8000,
  },


};