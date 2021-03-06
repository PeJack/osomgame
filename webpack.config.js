const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './resources/new_js'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, './resources/new_js'),
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
};