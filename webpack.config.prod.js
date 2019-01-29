'use strict'

const merge = require('webpack-merge')
const defaultConfig = require('./webpack.config')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')

module.exports = merge(defaultConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all",
            },
        },
    },
  },
  module: {
        rules: [{
            test: /\.css?$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, {
            test: /\.styl(us)?$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader', 
                'stylus-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ]
});
