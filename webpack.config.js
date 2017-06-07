const webpack = require('webpack'),
    happypack = require('happypack'),
    path = require('path'),
    APP_DIR = path.resolve(__dirname, 'src/app'),
    BUILD_DIR = path.resolve(__dirname, 'src/target');

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
