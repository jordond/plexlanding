/**
 * Handle deploying optimized source to server
 * Specify in gulp.config.js the settings for the prod server
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var $ = require('gulp-load-plugins')();

var gulpconf = require('../gulp.config');
var conf = gulpconf.deploy;
var help = gulpconf.help;

var options = {
  root: conf.source,
  hostname: conf.hostname,
  username: conf.username,
  destination: conf.destination,
  port: conf.port,
  emptyDirectories: true,
  clean: conf.clean,
  recursive: conf.clean,
  exclude: conf.exclude.concat(['config.json', 'tsd.json']),
  compress: true
};

/**
 * Just deploy server, useful when only developing server
 */
gulp.task('deploy:server', help.server.deploy, ['build:server'], deploy);

gulp.task('deploy:all', false, ['build:server', 'build:client'], deploy);

function deploy() {
  var files = [
    path.join(gulpconf.paths.build, '**/*'),
    './package.json'
  ];
  files = files.concat(options.include);
  return gulp.src(files)
    .pipe($.rsync(options));
}