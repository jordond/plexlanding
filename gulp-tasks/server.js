/**
 * Handle building of server source
 * - Clean all existing compiled server files
 * - Lint the typescript
 * - Compile to ES6 then Babel to ES5 w/Sourcemaps
 * - Watch for changes and rebuild only changed files
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var $ = require('gulp-load-plugins')();
var del = require('del');
var argv = require('yargs').argv;

var conf = require('../gulp.config');
var help = conf.help;

var linter = require('./linter')(gulp);
var isFirstRun = true;

var isProduction = false;
var isBuildDev = argv.d || (argv.env && argv.env.charAt(0).toLowerCase() === 'd');

if (argv.p || (argv.env && argv.env.charAt(0).toLowerCase() === 'p')) {
  isProduction = true;
}

gulp.task('clean:server', help.server.clean, function (done) {
  if (isFirstRun) {
    var dir = path.join(conf.paths.build, 'server');
    $.util.log('Cleaning ' + $.util.colors.blue('[' + path.resolve(dir) + ']'));
    return del(dir, done);
  }
  $.util.log($.util.colors.green('[Watching] Not cleaning'));
  return done();
});

gulp.task('vet:server', help.server.vet, ['clean:server'], function () {
  var linted = linter('Server', conf.ts.server, !isFirstRun);
  isFirstRun = false;
  return linted;
});

/**
 * Production build
 */

var plugins = require('webpack');
gulp.task('build:server', help.server.build, ['vet:server'], function () {
  if (isBuildDev) {
    return gulp.start('build:server:dev');
  }
  var config = conf.webpack.server;
  config.plugins = config.plugins.concat(
      new plugins.DefinePlugin({ 'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
      new plugins.optimize.DedupePlugin()
    );

  var watchFiles = isProduction;
  isProduction = true;
  return webpack(config, watchFiles);
});

/**
 * Development build with watch
 */

gulp.task('build:server:dev', help.server.devBuild, ['vet:server'], function () {
  var webpackConf = conf.webpack.server;
  return webpack(webpackConf, true);
});

gulp.task('watch:server', false, function () {
  // Let webpack handle the watching & compilation
  if (isProduction) {
    gulp.start('build:server');
  } else {
    gulp.start('build:server:dev');
  }
  gulp.watch(path.join(conf.paths.src, 'config.json'), ['copy:config']);
});

gulp.task('copy:config', false, function () {
  return gulp.src([
    path.join(conf.paths.src, 'config.json'),
    path.join(conf.paths.src, 'example.config.json')
  ]).pipe(gulp.dest(conf.paths.build));
});

/**
 * Run webpack to build files
 * @param {Object}  config    configuration for webpack
 * @param {Boolean} watching  whether or not to watch files
 */
function webpack(config, watching) {
  var mode = $.util.colors.blue('[DEVELOPMENT]');
  if (isProduction) {
    mode = $.util.colors.green('[PRODUCTION]');
  }
  if (watching) {
    config.watch = !isBuildDev;
    config.debug = true;
  }
  $.util.log('Running webpack [SERVER] in ' + mode + ' mode');

  // Copy over user config if it exists
  gulp.start('copy:config');

  var packed = gulp.src(conf.ts.server)
    .pipe($.webpack(config))
    .pipe(gulp.dest(path.join(conf.paths.build, 'server')));

  if (argv.debug || argv.debugBrk) {
    setTimeout(function () {
      gulp.start('nodemon');
    }, 3000);
  }
  return packed;
}
