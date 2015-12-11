/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */

'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();

var conf = require('../gulp.config');

gulp.task('bump', conf.help.bump, function () {
  var msg = 'Bumping versions';
  var type = argv.type;
  var version = argv.v || argv.version;
  var options = {};
  if (version) {
    options.version = version;
    msg += ' to ' + version;
  } else if (type) {
    options.type = type;
    msg += ' for a ' + type;
  }
  $.util.log($.util.colors.green(msg));

  return gulp
      .src('./package.json')
      .pipe($.print())
      .pipe($.bump(options))
      .pipe(gulp.dest('./'));
});