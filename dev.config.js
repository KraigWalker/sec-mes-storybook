const webpack = require("webpack");
const { resolve, resolveFromRoot } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");

console.log("**********************************************");
const brand = process.env.brand;
console.log("Compiling for - " + brand + " Brand");
const JSEntry = ["babel-polyfill", "whatwg-fetch", "./src/js/client.js"];


const SCSSEntry = [

  "./src/scss/main.scss",
  ...(brand ? [`./src/scss/web-components.${brand}.scss`] : [])
  ];


const extractMain = new ExtractTextPlugin(`${brand}.main.css`, { allChunks: true });
const extractWeb = new ExtractTextPlugin(`[name].css`, { allChunks: true });

module.exports = {
  entry: [...JSEntry, ...SCSSEntry],
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/src/compiled",
    filename: "[name].bundle.js",
    publicPath: ""
  },
  plugins: [
	new webpack.HotModuleReplacementPlugin(),
	
    new CopyWebpackPlugin([
      {
        from: "src/images",
        to: "images"
      },
      {
        from: "_config",
        to: "_config"
      },
      {
        context: resolve(__dirname, "node_modules/web-ui-components/lib"),
        from: "app.cb.css",
        to: "css"
      }
	]),
	extractMain,
	extractWeb,
    new HtmlWebpackPlugin({
      template: "src/index.html",
      excludeChunks: [
        "cb.main",
        "yb.main",
        "dyb.main",
        "undefined.main",
        "main"
      ]
	})
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: resolve(__dirname, "src"), // Avoid use of exclude
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        include: resolve(__dirname, "src"),
        use: extractMain.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader",
              options: {
                data: `$brand: ${brand};$env: prod;`
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: extractWeb.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            }
          ]
        })
      },
      {
		test: /\.json$/,
		exclude: ["/node_modules/"],
        loader: "json-loader"
      },
      {
        test: /\.(otf|ttf|eot|svg)$/,
        exclude: ["/node_modules/", "src/images/"],
        include: resolve(__dirname, "src/fonts/"),
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: ["/node_modules/", "src/fonts/"],
        include: resolve(__dirname, "src/images/"),
        loader: "file-loader?name=images/[name].[ext]"
      }
    ]
  },

  devServer: {
    contentBase: __dirname + "/src/compiled/",
    open: true, // Open browser after compilation
    openPage:
      "securemessages/CB#access_token=access_token&bank_id=CB&client_context=CB%20Web&user_tracking_id=23453-34343-34343&brandId=CB&state=state&isDocumentLibraryEnabled=true",
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "index.html" }]
    },
    host: "localhost",
    port: 8080,
    hot: true
  },

  resolve: {
	modules: [resolve(__dirname,"src"), "node_modules"],
    extensions: [".js", ".json", ".scss"]
  }
};
