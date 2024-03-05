const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? "source-map" : "eval-source-map",
    entry: {
        index: "./src/index.ts",
        code: "./src/sandbox/code.ts"
    },
    devtool: "source-map",
    experiments: {
        topLevelAwait: true,
        outputModule: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "[name].js",
    },
    externalsType: "module",
    externalsPresets: { web: true },
    externals: {
        "add-on-sdk-document-sandbox": "add-on-sdk-document-sandbox",
        "express-document-sdk": "express-document-sdk",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module",
            excludeChunks: ["code"],
        }),
        new HtmlWebpackPlugin({
            template: "src/views/main-modal.html",
            filename: "main-modal.html",
            scriptLoading: "module",
            excludeChunks: ["code"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/*.json", to: "[name][ext]" },
                // { from: "src/components/partials/*.html", to: "[name][ext]" },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
