const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
console.log("**********************************************");
const brand = process.env.brand;
console.log("Compiling for - "+brand+" Brand");
const JSEntry = ["babel-polyfill","./src/js/client.js"];
const SCSSEntry = ["./src/scss/main.scss", ...(brand ? [`./src/scss/web-components.${brand}.scss`] : [])];
module.exports = {
	entry: [...JSEntry, ...SCSSEntry],
	devtool: 'inline-source-map',
	output: {
		path:__dirname+ '/src/compiled',
		filename: "[name].bundle.js",
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin(`${brand}.main.css`, { allChunks: true }),
		new CopyWebpackPlugin([{
			  from: 'src/images',
			  to:'images'
		  }, {
			  from: '_config',
			  to: '_config'
		  }
		]),
		new HtmlWebpackPlugin({
			template: "src/index.html",
			excludeChunks: ["cb.main", "yb.main", "dyb.main", "undefined.main"],
		})
	],
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: resolve(__dirname, 'src'), // Avoid use of exclude
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				include: resolve(__dirname, 'src'),
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use:[{
							loader: "css-loader"
						},
						{
						loader:"sass-loader",
						options: {
                            data: `$brand: ${brand};$env: prod;`
                        }
					}]
				}),
			},
			{
			  test: /\.json$/,
			  loader: 'json-loader'
			},
			{
			  test: /\.(otf|ttf|eot|svg)$/,
			  exclude: ['/node_modules/','src/images/'],
			  include: resolve(__dirname, "src/fonts/"),
			  loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
			  test: /\.(jpg|jpeg|gif|png|svg)$/,
			  exclude: ['/node_modules/','src/fonts/'],
			  include: resolve(__dirname, "src/images/"),
			  loader:'file-loader?name=images/[name].[ext]'
			}	
		]
	},
	
	devServer: {
		contentBase: __dirname +"/src/compiled/",
		open: true, // Open browser after compilation
		historyApiFallback: true, // Allow changes from history
		host: 'localhost',
		port: 8181,
		hot: true
	},
	
	resolve: {
        modules: [`${__dirname}/src`, 'node_modules'],
        extensions: ['.js', '.json', '.scss'],
    },
}