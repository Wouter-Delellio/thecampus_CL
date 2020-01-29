// Enable babel
const path = require("path");
const StyleLintPlugin = require("stylelint-webpack-plugin");

// Fetch version from package
const { version } = require("../package.json");

const getStyleLoader = (modules = false) => [
    {
        loader: "style-loader",
        query: {
            sourceMap: true,
        },
    },
    {
        loader: "css-loader",
        query: {
            sourceMap: true,
            url: true,
            localsConvention: "camelCase",
            modules: modules && {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
            },
        },
    },
    "resolve-url-loader",
    {
        loader: "postcss-loader",
        query: {
            config: {
                path: path.resolve(__dirname, "../conf/postcss.config.js"),
            },
        },
    },
    {
        loader: "sass-loader",
        query: {
            sourceMap: true,
            includePaths: [path.resolve(__dirname, "../node_modules")],
        },
    },
];

const webpackConfig = {
    module: {
        rules: [
            // Javascripts
            {
                test: /\.js$/,
                use: ["eslint-loader"],
                enforce: "pre",
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: "babel-loader",
            },
            // Scss
            {
                test: /\.module\.scss$/,
                use: getStyleLoader(true),
            },
            {
                test: /\.scss$/,
                use: getStyleLoader(),
                exclude: /\.module\.scss$/,
            },
            // Image loader
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        query: {
                            name: "[md5:hash:hex].[ext]",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        query: {
                            optipng: {
                                enabled: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new StyleLintPlugin({
            files: ["**/*.scss"],
        }),
    ],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "../src/components/"),
        },
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        disableHostCheck: true,
        hot: false,
    },
};

// Export config
module.exports = {
    title: process.env.TITLE,
    components: "../src/components/[A-Z]**/*.js",
    ignore: ["**/test.js"],
    styleguideDir: path.resolve(__dirname, "../public/___docs"),
    version,
    webpackConfig,
};
