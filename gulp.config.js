'use strict';

/**
 * Contains the majority of the configuartion for the gulp tasks
 */

var path = require('path');
var gutil = require('gulp-util');
var argsv = require('yargs').argv;

var nodeServer = {
  port: 9000,
  env: 'development'
};

var browserSync = {
  host: 'localhost',
  port: 3000,
  proxy: 'http://localhost:' + (argsv.port || nodeServer.port || 9000) // TODO read node server from env.js file
};


var paths = {
  src: path.resolve('./src'),
  server: path.resolve('./src/server'),
  client: path.resolve('./src/client'),
  tmp: path.resolve('./.tmp'),
  build: path.resolve('./build')
};

var serverTsconfig = path.join(paths.server, 'tsconfig.json');
var serverTs = path.join(paths.server, '**/*.ts');
var webpackServer = path.resolve('./webpack.server.config.js');

var clientTsconfig = path.join(paths.client, 'tsconfig.json');
var clientTs = path.join(paths.client, '**/*.ts');
var webpackClient = path.resolve('./webpack.client.config.js');


var typings = path.resolve('./typings/tsd.d.ts');

function errorHandler(err) {
  var title = '';
  if (err.plugin) {
    title = err.plugin.replace('gulp-', '');
  } else if (err.name) {
    title = err.name.replace('error', '').trim();
  }
  gutil.log(gutil.colors.red('[' + title + ']'), err.message);
  this.emit('end');
}

/**
 * Exports
 */

var config = {
  paths: paths,
  tsConfig: {
    server: serverTsconfig,
    client: clientTsconfig
  },
  ts: {
    all: [serverTs, clientTs],
    server: serverTs,
    client: clientTs
  },
  typings: typings,
  webpack: {
    server: require(webpackServer),
    client: require(webpackClient)
  },
  browserSync: browserSync,
  errorHandler: errorHandler,
  help: require('./gulp-tasks/help'),
  deploy: require('./deploy.config'),
  server: nodeServer
};

module.exports = config;