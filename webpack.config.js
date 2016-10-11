var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.dev.config');

config.output.filename = 'formobx.min.js';
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

module.exports = config;
