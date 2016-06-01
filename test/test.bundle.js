
/*
 * When testing with Webpack and ES6, we have to do some
 * preliminary setup. Because we are writing our tests also in ES6,
 * we must transpile those as well, which is handled inside
 * `karma.conf.js` via the `karma-webpack` plugin. This is the entry
 * file for the Webpack tests. Similarly to how Webpack creates a
 * `bundle.js` file for the compressed app source files, when we
 * run our tests, Webpack, likewise, compiles and bundles those tests here.
*/
import corejs from 'core-js';
import angular from 'angular';

import mocks from 'angular-mocks';

/**
 * Find and require all of the *.test files
 */
const context = require.context('../src/client', true, /\.test\.js/);
context.keys().forEach(context);
