const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const jsDir = path.resolve('./src/server');
const entryOut = path.resolve('./dist/server');

module.exports = {
  entry: ['babel-regenerator-runtime', path.resolve(jsDir, 'index.js')],
  target: 'node',
  node: {
    __dirname: true
  },
  output: {
    path: entryOut,
    filename: 'index.js'
  },
  externals: nodeExternals(),
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /(node_modules)/ },
      { test: /\.json$/, loader: 'json', exclude: /(node_modules)/ }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules', jsDir]
  },
  devtool: 'source-map',
  stats: {
    colors: true,
    chunkModules: false
  },
};
