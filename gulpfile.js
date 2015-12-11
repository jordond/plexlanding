'use strict';

var gulp = require('gulp-help')(require('gulp'));
var wrench = require('wrench');
var argv = require('yargs').argv;

var help = require('./gulp-tasks/help');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp-tasks').filter(function (file) {
  return (/\.(js)$/i).test(file);
}).map(function (file) {
  require('./gulp-tasks/' + file);
});

/**
 *  Default task display all of the available tasks
 */
gulp.task('default', false, function () {
  gulp.start('help');
});

/**
 * Clean all existing compiled files
 */
gulp.task('clean', help.clean, ['clean:server', 'clean:client']);

/**
 * Run the linter on all the typescript files
 */
gulp.task('vet', help.vet, ['vet:server', 'vet:client']);

/**
 * Compile all of the typescript files and optimize for production
 */
gulp.task('build', help.build, ['build:server'], function () {
  if (argv.d || (argv.env && argv.env.charAt(0).toLowerCase() === 'd')) {
    gulp.start('build:client:dev');
  } else {
    gulp.start('build:client');
  }
});

/**
 * Compile for development and watch changes
 */
gulp.task('dev', help.watch, ['watch:server', 'watch:client']);

/**
 * Run nodemon to serve the node files
 */
gulp.task('serve', help.serve, ['watch:server', 'watch:client'], function () {
  gulp.start('nodemon');
});

/**
 * Compile source then deploy to remote server
 */
gulp.task('deploy', help.deploy, ['deploy:all']);
