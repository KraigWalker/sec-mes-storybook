const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    "babel-polyfill",
    "./src/js/client.js"
  ],
  devtool: 'inline-source-map',
  output: {
      path:__dirname+ '/src/compiled/',
      filename: "[name].bundle.js",
      publicPath: '/'
  },
  plugins: [    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({  //  generate a index.html
      filename: 'index.html',
      template: 'src/html/index.html'
    })
    ],
  devtool: "source-map",
  module: {
      rules: [
          {
              test: /\.js?$/,
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
                  sourceMap: true,
                  data: "$brand: dyb;$env: dev;"
                },// compiles Sass to CSS
            }]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg|otf|gif)$/, 
            loader: 'url-loader' 
          },
          {
            test: /\.(html)$/,
            exclude:/node_modules/,
            use: {
              loader: 'html-loader'
              
            }
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