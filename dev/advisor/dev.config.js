const webpack = require("webpack");
const paths = require("../../paths");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { presets, plugins } = require("../../webpack.config.babel");

console.log("**********************************************");
console.log("Compiling");

const JSEntry = ["babel-polyfill", "whatwg-fetch", `${__dirname}/index.js`];
module.exports = {
    entry: [...JSEntry],
    devtool: "inline-source-map",
    mode: "development",
    output: {
      path: __dirname + "/compiled",
      filename: "[name].bundle.js",
      publicPath: "/",
      libraryTarget: "umd",
      library: "cybgSecureMessagingUI",
      libraryExport: "default"
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
            inject: true,
            template: `${__dirname}/index.html`,
            excludeChunks: ["undefined.main"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [paths.resolveFromRoot("src"), __dirname], // Avoid use of exclude
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
        contentBase: __dirname + "/compiled/",
        open: true, // Open browser after compilation
         historyApiFallback: {
          rewrites: [{ from: /^\/$/, to: "index.html" }]
        },
        host: "localhost",
        port: 8080,
        hot: true
    },

    resolve: {
        modules: [resolve(__dirname,"src"), "node_modules"],
        extensions: ['.js', '.json','.css',],
    }
};
