/* eslint-disable */
var webpackConfig = require('./config.webpack');

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'test/test.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-chai"),
      require("karma-phantomjs-launcher"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack")
    ],

    preprocessors: { 'test/test.bundle.js': ['webpack', 'sourcemap'] },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    browsers: ['PhantomJS'],

    singleRun: true
  });
};