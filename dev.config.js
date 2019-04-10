const webpack = require("webpack");
const paths = require("./paths");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { presets, plugins } = require("./webpack.config.babel");

console.log("**********************************************");
console.log("Compiling");
const JSEntry = ["babel-polyfill", "whatwg-fetch", "./src/js/client.js"];

module.exports = {
  entry: [...JSEntry],
  devtool: "inline-source-map",
  mode: "development",
  output: {
    path: __dirname + "/src/compiled",
    filename: "[name].bundle.js",
    publicPath: ""
  },
  plugins: [
	new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        context: paths.resolveFromRoot("node_modules/web-ui-components/lib"),
        from: "**/*.css",
        to: "css"
      },
      {
        from: "src/images",
        to: "images"
      },
      {
        from: "_config",
        to: "_config"
      }
	]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      excludeChunks: [
        "undefined.main",
        "main"
      ]
	})
  ],
  module: {
    rules: [
    {
        test: /\.jsx?$/,
        include: resolve(__dirname, "src"), // Avoid use of exclude
        use: {
            loader: "babel-loader",
            options: {
                babelrc: false,
                presets,
                plugins,
            },
        },
    },
    {
		test: /\.json$/,
		  exclude: ["/node_modules/"],
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          "css-loader"
        ]
      },
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
    extensions: [".js", ".json", ".scss", ".css"]
  }
};
