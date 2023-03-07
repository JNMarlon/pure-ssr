const { ext } = require('./webpack.constant');
const isWebTarget = (caller) => Boolean(caller && caller.target === 'web');

const isWebpack = (caller) => Boolean(caller && caller.name === 'babel-loader');

module.exports = (api) => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            { useBuiltIns: web ? 'entry' : undefined, targets: !web ? { node: 'current' } : undefined, module: webpack ? false : 'commonjs' },
            '@babel/preset-typescript',
        ],
        plugins: ['@loadable/babel-plugin', ['module-resolver', { root: ['.'], extensions: [ext.ts, ext.tsx] }]],
    };
};
