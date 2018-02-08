const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
console.log("**********************************************");
const brand = process.env.brand;
console.log("Compiling for - "+brand+" Brand");
const JSEntry = ["babel-polyfill","./src/js/client.js","./src/scss/main.scss"];
const SCSSEntry = ["babel-polyfill","./src/scss/main.scss"];
module.exports = {
	entry: JSEntry,
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
			from: 'src/index.html'
		  }])
	],
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: resolve(__dirname, 'src'), // Avoid use of exclude
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
				}
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
				test: /\.(html)$/,
				exclude:/node_modules/,
				use: {
					loader: 'html-loader'
				}
			},
			{
			  test: /\.json$/,
			  loader: 'json-loader'
			},
			{
			  test: /\.(jpg|jpeg|gif|png|svg)$/,
			  exclude: /node_modules/,
			  include: resolve(__dirname, "src/images/"),
			  loader:'url-loader?limit=1024&name=images/[name].[ext]'
			},
			{
			  test: /\.(otf|ttf|eot|svg)$/,
			  exclude: /node_modules/,
			  include: resolve(__dirname, "src/fonts/"),
			  loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
			}
			
		]
	},
	
	devServer: {
		contentBase: __dirname +"/src/compiled/",
		open: true, // Open browser after compilation
		historyApiFallback: true, // Allow changes from history
		host: 'localhost',
		port: 8000,
	},
	
	resolve: {
        modules: [`${__dirname}/src`, 'node_modules'],
        extensions: ['.js', '.json', '.scss'],
    },
}