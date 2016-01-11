var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryTs = path.resolve('./src/client/index.ts');
var entryOut = path.resolve('./build/client');
var indexHtml = path.resolve('./src/client/index.html');

module.exports = {
  entry: {
    vendor: ['angular', 'angular-animate', 'angular-aria', 'angular-material', 'angular-ui-router'],
    app: entryTs
  },
  output: {
    path: entryOut,
    filename: 'js/[name].[hash:6].bundle.js',
    sourceMapFilename: 'js/[name].[hash:6].bundle.js.map'
  },
  module: {
    loaders: [{
      test: /\.tpl.html$/,
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src/client')) + '/!html-loader'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
    }, {
      test: /\.ts$/,
      exclude: /(node_modules)/,
      loader: "ng-annotate?add=false!babel!ts-loader"
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=100000&mimetype=image/png'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: indexHtml,
      inject: 'body'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor-[hash:6].bundle.js',
      minChunks: Infinity
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  devtool: 'sourcemap'
};