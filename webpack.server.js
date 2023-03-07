const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { ext, loader } = require('./webpack.constant');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    target: 'node',
    node: false,
    entry: {
        server: './src/server.tsx',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    module: {
        rules: [{ test: /\.tsx?$/, use: [loader.babel, loader.ts], exclude: /node_modules/ }],
    },

    resolve: {
        extensions: [ext.js, ext.jsx, ext.ts, ext.tsx],
    },

    externals: [nodeExternals()],
};
