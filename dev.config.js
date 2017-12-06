const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const brand = process.env.npm_config_bank;
console.log("in dev config --- "+brand);


module.exports = {
    entry: {
		app: [ "babel-polyfill", resolve(__dirname,'src/js/client')],
		maincss: resolve(__dirname, 'src/scss/main')
	},
	devtool: 'source-map',
	output: {
		path:__dirname+ '/src/compiled/local/',
		filename: "[name].bundle.js",
		publicPath: '/'
	},
	plugins: [    
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("dyb.main.css")
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
                            data: "$brand: dyb;$env: prod;"
                        }
					}]
				}),
				// use: [
				// 	{
				// 		loader: "style-loader", 
				// 		options: {
				// 			sourceMap: true
				// 		} // creates style nodes from JS strings
				// 	}, {
				// 		loader: "css-loader", 
				// 		options: {
				// 			sourceMap: true
				// 		} // translates CSS into CommonJS
				// 	}, {
				// 		loader: "sass-loader", 
				// 		options: {
				// 			sourceMap: true,
				// 			data: "$brand: brand;$env: dev;"
				// 		},// compiles Sass to CSS
				// 	}
				// ]
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


// const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: [
//     "babel-polyfill",
//     "./src/js/client.js"
//   ],
//   devtool: 'source-map',
//   output: {
//       path:__dirname+ '/src/compiled/',
//       filename: "[name].bundle.js",
//       publicPath: '/'
//   },
//   plugins: [    
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(),
//     new HtmlWebpackPlugin({  //  generate a index.html
//       filename: 'index.html',
//       template: 'src/html/index.html'
//     })
//     ],
//   module: {
//       rules: [
//           {
//               test: /\.js?$/,
//               exclude:/node_modules/,
//               loader: 'babel-loader',
//               query: {
//                 presets: ['react', 'es2015', 'stage-0'],
//                 plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
//               }
//           },
//           {
//             test: /\.scss$/,
//             exclude: /node_modules/,
//             use: [{
//                 loader: "style-loader", 
//                 options: {
//                   sourceMap: true
//                 } // creates style nodes from JS strings
//             }, {
//                 loader: "css-loader", 
//                 options: {
//                   sourceMap: true
//                 } // translates CSS into CommonJS
//             }, {
//                 loader: "sass-loader", 
//                 options: {
//                   sourceMap: true,
//                   data: "$brand: dyb;$env: dev;"
//                 },// compiles Sass to CSS
//             }]
//           },
//           {
//             test: /\.json$/,
//             loader: 'json-loader'
//           },
//           {
//             test: /\.(png|woff|woff2|eot|ttf|svg|otf|gif)$/, 
//             loader: 'url-loader' 
//           },
//           {
//             test: /\.(html)$/,
//             exclude:/node_modules/,
//             use: {
//               loader: 'html-loader'
              
//             }
//           }

//       ]
//   },
//   devServer: {
//     contentBase: __dirname +"/src/",
//     compress: true,
//     inline: true,
//     open: true,
//     hot: true,
//     host: 'localhost',
//     historyApiFallback: true,
//     port: 8000,
//   },


// };