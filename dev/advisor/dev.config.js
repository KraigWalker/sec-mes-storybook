const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
console.log("**********************************************");
console.log(__dirname, resolve(__dirname, '../../src'), resolve(__dirname, '../../dist'))
const brand = process.env.brand;
console.log("Compiling for - "+brand+" Brand");
const JSEntry = `${__dirname}/index.js`;
const SCSSEntry = [`${__dirname}/../../src/scss/main.scss`, ...(brand ? [`${__dirname}/../../src/scss/web-components.${brand}.scss`] : [])];
module.exports = [{
	entry: JSEntry,
	devtool: 'inline-source-map',
	output: {
		path: resolve(__dirname, '../../dist'),
		filename: "[name].bundle.js",
      publicPath: '/',
        libraryTarget: "umd",
        library: "cybgSecureMessagesUI",
        libraryExport: "default"
	},
	plugins: [
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
			inject: false,
			template: `${__dirname}/index.html`,
			excludeChunks: ["cb.main", "yb.main", "dyb.main", "undefined.main"],
		})
	],
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: [resolve(__dirname, '../../src'), __dirname], // Avoid use of exclude
				loader: 'babel-loader',

			},
			{
			  test: /\.json$/,
			  loader: 'json-loader'
			},
			{
			  test: /\.(jpg|jpeg|gif|png|svg)$/,
			  exclude: ['/node_modules/','src/fonts/'],
			  include: resolve(__dirname, "../../src/images/"),
			  loader:'file-loader?name=images/[name].[ext]'
			}
		]
	},
	
	devServer: {
		contentBase: resolve(__dirname, "../../dist"),
		open: true, // Open browser after compilation
		historyApiFallback: {
			rewrites: [
				{ from: /^\/$/, to: "index.html" }
			]
		},
		host: 'localhost',
		port: 8080
	},
	
	resolve: {
        modules: [`${__dirname}/../../src`, 'node_modules'],
        extensions: ['.js', '.json', '.scss'],
    },
},
{
	entry: SCSSEntry,
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: resolve(__dirname, '../../src'),
				use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use:[
					{
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
			test: /\.(otf|ttf|eot|svg)$/,
			exclude: ['/node_modules/','src/images/'],
			include: resolve(__dirname, "../../src/fonts/"),
			loader: 'file-loader?name=fonts/[name].[ext]'
		},
		{
			test: /\.(jpg|jpeg|gif|png|svg)$/,
			exclude: ['/node_modules/','src/fonts/'],
			include: resolve(__dirname, "../../src/images/"),
			loader:'file-loader?name=images/[name].[ext]'
		}
]
},
output: {
	path: resolve(__dirname, '../../dist'),
	filename: "[name]",
	publicPath: '/',
},
plugins: [
	new ExtractTextPlugin(`${brand}.main.css`, { allChunks: true }),
]
}]