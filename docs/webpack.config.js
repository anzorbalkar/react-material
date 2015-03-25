var fs = require("fs");
var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var reactJsPath = path.resolve(__dirname, 'node_modules/react/dist', 'react-with-addons.js'),
    reactMinJsPath = path.resolve(__dirname, 'node_modules/react/dist', 'react-with-addons.min.js');

var reactMaterialJsPath = path.resolve(__dirname, '../build/react-material.js'),
    reactMaterialMinJsPath = path.resolve(__dirname, '../dist/react-material.min.js');

var jsFilename = 'react-material-docs.js',
    jsMinFilename = 'react-material-docs.min.js',
    cssFilename = 'react-material-docs.css',
    cssMinFilename = 'react-material-docs.min.css';

var html = fs.readFileSync(path.resolve(__dirname, "src/index.html"), "utf-8");

var devConfig = {
  devServer: {
    contentBase: './build',
  },
  devtool: 'eval',
  output: {
    path: './build',
    filename: jsFilename
  },
  plugins: [
    new ExtractTextPlugin(cssFilename),
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      templateContent: html.replace('{{SCRIPT_URL}}', jsFilename).replace('{{CSS_URL}}', cssFilename)
    })
  ],
  module: {
    noParse: [reactJsPath],
    loaders: [
      { test: /\.woff2/, loader: 'url-loader'},
      { test: /\.less/, loader: ExtractTextPlugin.extract('css-loader!less-loader') },
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
    filename: jsMinFilename
  },
  plugins: [
    new ExtractTextPlugin(cssMinFilename),
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      templateContent: html.replace('{{SCRIPT_URL}}', jsMinFilename).replace('{{CSS_URL}}', cssMinFilename)
    })
  ],
  module: {
    noParse: [reactMinJsPath],
    loaders: [
      { test: /\.woff2/, loader: 'url-loader'},
      { test: /\.less/, loader: ExtractTextPlugin.extract('css?minimize!less?sourceMap') },
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