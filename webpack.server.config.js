var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var entryTs = path.resolve('./src/server/index.ts');
var entryOut = path.resolve('./build/server');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: entryTs,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: entryOut,
    filename: 'index.js'
  },
  externals: nodeModules,
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [{
      test: /\.ts$/,
      exclude: /(node_modules)/,
      loader: "babel!ts-loader"
    }, {
      test: /\.json$/,
      exclude: /(node_modules)/,
      loader: "json-loader"
    }]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  devtool: 'sourcemap'
};