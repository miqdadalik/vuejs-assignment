'use strict'

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'assets': path.join(__dirname, 'assets')
        }
    },
    module: {
        rules: [//{
            // test: /\.(js|vue)$/,
            // use: 'eslint-loader',
            // enforce: 'pre'
        //}, 
        {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
            }, 
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }]
        }
        
        // },{
        //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        //     use: {
        //         loader: 'url-loader',
        //         options: {
        //             limit: 10000,
        //             name: path.posix.join('assets', 'img')
        //         }
        //     }
        // }, {
        //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        //     use: {
        //         loader: 'url-loader'
        //     },
        //     options: {
        //         limit: 10000,
        //         name: path.posix.join('assets', 'fonts')
        //     }
        // }
    ]},
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'assets/img'),
            to: path.join(__dirname, 'dist/assets/img'),
            toType: 'dir'
        }])
    ]
}
