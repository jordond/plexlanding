/**
 * Contains all the task descriptions to be used with gulp-help package
 * {
 *   taskName: 'Task description'
 * }
 */

'use strict';

module.exports = {
  server: {
    vet: 'Lint server typescript only',
    build: 'Compile server typescript to ES5',
    watch: 'Watch server files for changes',
    clean: 'Clean existing server javascript',
    deploy: 'Deploy only server files to server'
  },
  client: {
    vet: 'Lint client typescript only',
    build: 'Bundle optimized client source code with webpack',
    devBuild: 'Bundle source with webpack in debug mode',
    watch: 'Watch client files for changes',
    clean: 'Clean existing client javascript'
  },
  vet: 'Lint both client and server typescript',
  build: 'Compile and optimize source for production',
  watch: 'Watch server and client files for changes',
  clean: 'Clean compiled javascript',
  optimize: 'Compile server and client for production',
  deploy: 'Compile optimized code and deploy to remote server',
  bump: 'Automatically update version number, check README',
  serve: 'Launch node server in debug mode'
};