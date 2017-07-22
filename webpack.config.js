const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(
    __dirname,
    "build",
);

module.exports = {
    entry: {
        bundle: [
            "./source/index.tsx",
        ],
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: ROOT,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: ["file-loader"]
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "source/index.ejs",
            title: "Simple Todo",
        })
    ],
};