const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
// const WebpackModuleFederation = require('webpack/lib/moduleFer')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig ={
    mode:'development',
    output:{
        publicPath:'http://localhost:8083/'
    },
    devServer:{
        port:8083,
        historyApiFallback:{
            index:'/index.html'
        },
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
    },
    plugins:[
        new ModuleFederation({
           name:'dashboard',
           filename:'remoteEntry.js',
           exposes:{
            './DashBoardApp':'./src/bootstrap'
           },
           shared:packageJson.dependencies

        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        
    ]
}

module.exports = merge(commonConfig,devConfig)