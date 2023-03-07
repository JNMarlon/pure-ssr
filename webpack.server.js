const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { ex, loader } = require('./webpack.constant');

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
        extensions: [ex.js, ex.jsx, ex.ts, ex.tsx],
    },

    externals: [nodeExternals()],
};
