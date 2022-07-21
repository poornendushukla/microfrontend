const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
// const WebpackModuleFederation = require('webpack/lib/moduleFer')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig ={
    mode:'development',
    output:{
        publicPath:'http://localhost:8082/'
    },
    devServer:{
        port:8082,
        historyApiFallback:{
            index:'/index.html'
        }
    },
    plugins:[
        new ModuleFederation({
           name:'auth',
           filename:'remoteEntry.js',
           exposes:{
            './AuthApp':'./src/bootstrap'
           },
           shared:packageJson.dependencies

        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        
    ]
}

module.exports = merge(commonConfig,devConfig)