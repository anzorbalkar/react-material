var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var reactJsPath = path.resolve(__dirname, 'node_modules/react/dist', 'react-with-addons.js'),
    reactMinJsPath = path.resolve(__dirname, 'node_modules/react/dist', 'react-with-addons.min.js');
var reactMaterialJsPath = path.resolve(__dirname, '../build/react-material.js'),
    reactMaterialMinJsPath = path.resolve(__dirname, '../dist/react-material.min.js');

var devConfig = {
  devServer: {
    contentBase: './build',
  },
  devtool: 'eval',
  output: {
    path: './build',
    filename: 'react-material-docs.js'
  },
  plugins: [/*new ExtractTextPlugin('react-material.css')*/],
  module: {
    noParse: [reactJsPath, reactMaterialJsPath],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].html" },
      //{ test: /\.less/, loader: ExtractTextPlugin.extract('css-loader!less-loader') },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    alias: { 
      'react': reactJsPath,
      'react-material': reactMaterialJsPath
    }
  },
};

var prodConfig = {
  devtool:'source-map',
  output: {
    path: './dist',
    filename: 'react-material-docs.min.js'
  },
  plugins: [/*new ExtractTextPlugin('react-material.min.css')*/],
  module: {
    noParse: [reactMinJsPath, reactMaterialMinJsPath],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].html" },
      //{ test: /\.less/, loader: ExtractTextPlugin.extract('css?minimize!less?sourceMap') },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    alias: { 
      'react': reactMinJsPath,
      'react-material': reactMaterialMinJsPath
    }
  },
};

var baseConfig = {
  entry: './src/react-material-docs.jsx',
  output: {
    libraryTarget: 'umd'
  }
};

module.exports = _.merge(baseConfig, process.env.NODE_ENV === 'production' ? prodConfig : devConfig);