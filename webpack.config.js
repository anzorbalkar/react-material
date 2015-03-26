var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devConfig = {
  devServer: {
    contentBase: './build',
  },
  devtool: 'eval',
  output: {
    path: './build',
    filename: 'react-material.js'
  },
  plugins: [new ExtractTextPlugin('react-material.css')],
  module: {
    loaders: [
      { test: /\.woff2/, loader: 'url-loader'},
      { test: /\.less/, loader: ExtractTextPlugin.extract('css-loader!less-loader') },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};

var prodConfig = {
  devtool:'source-map',
  output: {
    path: './dist',
    filename: 'react-material.min.js'
  },
  plugins: [new ExtractTextPlugin('react-material.min.css')],
  module: {
    //noParse: [__dirname + '/third_party/waves.js'],
    loaders: [
      { test: /\.woff2/, loader: 'url-loader'},
      { test: /\.less/, loader: ExtractTextPlugin.extract('css?minimize!less?sourceMap') },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};

var baseConfig = {
  entry: './src/react-material.js',
  output: {
    libraryTarget: 'umd'
  },
  externals: ['react'],
};

module.exports = _.merge(baseConfig, process.env.NODE_ENV === 'production' ? prodConfig : devConfig);