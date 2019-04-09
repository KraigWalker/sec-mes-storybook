const webpack = require("webpack");
const paths = require("../../paths");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("**********************************************");
console.log("Compiling");
const JSEntry = `${__dirname}/index.js`;

module.exports = {
    entry: JSEntry,
    devtool: "inline-source-map",
    output: {
        path: resolve(__dirname, '../../dist'),
        filename: "[name].bundle.js",
        publicPath: '/',
        libraryTarget: "umd",
        library: "cybgSecureMessagesUI",
        libraryExport: "default"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
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
            inject: false,
            template: `${__dirname}/index.html`,
            excludeChunks: ["cb.main", "yb.main", "dyb.main", "undefined.main"]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [resolve(__dirname, '../../src'), __dirname], // Avoid use of exclude
                loader: "babel-loader"
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
        modules: [resolve(__dirname,"src"), "node_modules"],
        extensions: ['.js', '.json'],
    }
};
