const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig,{
    devtool:'inline-source-map',
    devServer: {
        contentBase:'../dist'
    }
})