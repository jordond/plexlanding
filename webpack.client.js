const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const projectRoot = path.resolve(__dirname);
const assetPath = path.resolve('./dist/client');
const htmlIndex = path.resolve('./src/client/index.html');
const entryJS = path.resolve('./src/client/index.js');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Shared plugins used by both production and development mode
 */
const commonPlugins = [
  new HtmlWebpackPlugin({
    template: htmlIndex,
    inject: 'body'
  }),

  new CommonsChunkPlugin({
    name: 'vendor',
    filename: isProduction ? 'vendor-[hash:6].js' : 'vendor.js',
    minChunks: Infinity
  }),
];

/**
 * Share configuration between all environments
 */
const sharedConfig = {
  context: __dirname,
  entry: {
    vendor: ['angular', 'angular-ui-router', 'angular-animate', 'angular-aria', 'angular-material', 'angular-messages'],
    app: entryJS
  },
  output: {
    path: assetPath,
    publicPath: 'client/'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.tpl.html$/, loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src/client')) + '/!html-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader' },
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'ng-annotate!babel' },
      { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.png$/, loader: 'url-loader?name=images/[hash:6]-[name].png&limit=100000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.json$/, loader: 'file?name=json/[name].[ext]' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.json', '.css', '.scss']
  }
};

/**
 * Config for development
 */
const devConfig = {
  devtool: 'inline-source-map',
  output: Object.assign(sharedConfig.output, {
    filename: '[name].js',
    chunkFilename: '[name].js'
  }),
  plugins: [
    ...commonPlugins,
    new BrowserSyncPlugin({
      proxy: 'http://localhost:' + process.env.PORT,
      open: false
    })
  ]
};

/**
 * Config for production
 */
const prodConfig = {
  devtool: 'source-map',
  output: Object.assign(sharedConfig.output, {
    filename: '[name]-[hash:6].js',
    chunkFilename: '[name]-[chunkhash:6].js'
  }),
  plugins: [
    ...commonPlugins,
    new CleanPlugin([assetPath], { root: projectRoot, verbose: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

/**
 * Config for running tests with mocha-webpack
 */
const testsConfig = {
  entry: {},
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass-loader' },
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'ng-annotate!babel' },
      { test: /\.json$/, loader: 'file?name=json/[name].[ext]' }
    ]
  }
};

/**
 * Get the right configuration object based on the environment
 */
const config = {
  production: prodConfig,
  development: devConfig,
  test: testsConfig
}[process.env.NODE_ENV || 'development'];
console.log('Webpack is running in %s mode', process.env.NODE_ENV);

/**
 * Combine with shared config then export
 */
module.exports = Object.assign(sharedConfig, config);
