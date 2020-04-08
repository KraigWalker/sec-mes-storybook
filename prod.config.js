const webpack = require('webpack');
const { resolve } = require('path');
const paths = require("./paths");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { presets, plugins } = require("./webpack.config.babel");
console.log("**********************************************");
console.log("Compiling");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const JSEntry = ["babel-polyfill", "./src/js/client.js"];
module.exports = {
	entry: [...JSEntry],
	mode: "production",
	output: {
	  path: __dirname + "/build",
	  filename: "[name].bundle.js",
	  publicPath: ""
	},
	plugins: [
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
		}
	  ]),
	  new HtmlWebpackPlugin({
		template: "src/index.html",
		excludeChunks: [
		  "undefined.main",
		  "main"
		]
	  }),
	  new webpack.DefinePlugin({
		 "process.env.NODE_ENV": JSON.stringify("production"),
	}),
	],
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
					keep_fnames: true,
          mangle: true
        }
			}),
	]},
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
	resolve: {
		modules: [resolve(__dirname,"src"), "node_modules"],
		extensions: [".js", ".json", ".scss", ".css"]
	}
}
