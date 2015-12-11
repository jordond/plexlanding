/**
 * Optional task for development, triggered by flag or by task name
 *
 * Starts node with nodemon in debug mode.  Useful if you do not want to
 * use your IDE's debugger, ie VSCode.
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')();

var conf = require('../gulp.config');
var colors = $.util.colors;

gulp.task('nodemon', false, function () {
  var debugMode;
  if (args.debugBrk) {
    debugMode = '--debug-brk';
  } else {
    debugMode = '--debug';
  }

  var nodeOptions = {
    script: args.script || path.join(conf.paths.build, 'server'),
    env: {
      'PORT': args.port || conf.server.port || 9000,
      'NODE_ENV': args.env || conf.server.env || 'development'
    },
    nodeArgs: [debugMode],
    execMap: {
      'js': debugMode || 'node'
    },
    watch: path.join(conf.paths.build, 'server/**/*.js')
  };

  return $.nodemon(nodeOptions)
    .on('restart', function (ev) {
      $.util.log('Nodemon ' + colors.cyan(' has restarted'));
    })
    .on('start', function () {
      $.util.log('Nodemon ' + colors.green(' has started'));
      $.util.log('Environment: ' + nodeOptions.env['NODE_ENV']);
    })
    .on('crash', function () {
      $.util.log('Nodemon ' + colors.red(' has crashed'));
    })
    .on('exit', function () {
      $.util.log('Nodemon ' + colors.green(' exited cleanly'));
    });
});