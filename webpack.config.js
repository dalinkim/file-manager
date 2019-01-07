const path = require('path');

module.exports = {
    entry: {
        app: './src/App.jsx',
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
    },
    output: {
        path: path.resolve(__dirname, 'static'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: 'vendor',
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },

    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
        }]
    }
};