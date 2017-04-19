const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    context: path.resolve(__dirname, './resources/js'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './resources/build'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
            },
        ],
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};