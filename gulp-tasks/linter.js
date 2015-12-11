'use strict';

var $ = require('gulp-load-plugins')();
var conf = require('../gulp.config');
var _gulp;

module.exports = function (gulp) {
  if (gulp) {
    _gulp = gulp;
    return doLint;
  }
  throw 'No gulp was passed in';
};

/**
 * Lint all files using tslint and report the outcome
 * @param {string}  title Display in report
 * @param {Object}  files gulp-vinly files stream
 * @param {Boolean} displayFiles  whether or not to list files in report
 * @returns gulp stream
 */
function doLint(title, files, displayFiles) {
  return _gulp.src(files)
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('vet:' + title))
        .pipe($.tslint())
        .pipe($.tslint.report('prose', { summarizeFailureOutput: true }))
        .pipe($.size({ title: 'Linter:' + title, showFiles: displayFiles }))
    .pipe($.plumber.stop());
}