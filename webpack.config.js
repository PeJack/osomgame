const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './resources/webgl'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, './resources/webgl'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: [/\.fs$/, /\.vs$/, /\.js$/],
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
            }
        ],
    },
    resolve: {
        modules: [
          path.resolve(__dirname, './resources/webgl')
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "./resources/webgl"),
        port: 8080,
        stats: 'errors-only'
    },
};