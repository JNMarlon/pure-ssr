const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { loader, ex } = require('./webpack.constant');

const DEV_ENV = process.env.NODE_ENV === 'development';
const hotMiddlewareScript = 'webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true';

const getEntryPoint = (target) => {
    if (target === 'node') {
        return ['./src/App.tsx'];
    }

    return DEV_ENV ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx'];
};

const getConfig = (target) => ({
    mode: DEV_ENV ? 'development' : 'production',
    name: target,
    target,
    entry: getEntryPoint(target),
    output: {
        path: path.resolve(__dirname, `dist/${target}`),
        filename: '[name].js',
        publicPath: '/web/',
        libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    loader.babel,
                    {
                        loader: loader.ts,
                        options: {
                            getCustomTransformers: () => ({
                                before: [],
                            }),
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, loader.css, loader.sass],
            },
        ],
    },

    resolve: {
        extensions: [ex.js, ex.jsx, ex.ts, ex.tsx],
        alias: {
            page: path.resolve('src/page/'),
        },
    },
    plugins:
        target === 'web'
            ? [new LoadablePlugin(), new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin()]
            : [new LoadablePlugin(), new MiniCssExtractPlugin()],
    externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
});

module.exports = [getConfig('web'), getConfig('node')];
