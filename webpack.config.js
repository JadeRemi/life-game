const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        app: ["./src/index.tsx"]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js",
    },
    devtool: "source-map",
    devServer: {
        port: 3010,
        liveReload: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"]
                  }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
}