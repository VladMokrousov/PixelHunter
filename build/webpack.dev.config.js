const webpack = require('webpack');
//const path = require('path'); // Для нормальной работы contentBase
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  //devtool: "source-map",
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist, //path.join(__dirname, "./dist")
    compress: true,
    port: 8081,
    watchContentBase: true,
    //progress: true, Выводит процент поднятия сервера в консоль
    open: true,
    overlay: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});




