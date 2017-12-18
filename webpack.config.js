const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'jsonp.js',
    library: 'jsonp'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules')
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} | ${new Date().getFullYear()} by ${pkg.author}`)
  ]
}