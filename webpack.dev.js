const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ex, loader } = require('./webpack.constant');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',

    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 3000,
        hot: true,
        publicPath: '/',
    },

    module: {
        rules: [
            { test: /\/.tsx?$/, use: [loader.babel, loader.ts] },
            { test: /\.(scss|css)$/, use: [MiniCssExtractPlugin.loader, loader.css, loader.sass] },
        ],
    },

    resolve: {
        extensions: [ex.js, ex.jsx, ex.ts, ex.tsx],
        alias: {
            page: path.resolve('src/page/'),
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ filename: 'index.html', template: 'public/index_dev.html' }),
    ],
};
