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
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
            },
            {
                test: [/\.fs$/, /\.vs$/],
                use: 'raw-loader'
            }
        ],
    },
    resolve: {
        modules: [
          path.resolve(__dirname, './resources/webgl')
        ]
    }
};