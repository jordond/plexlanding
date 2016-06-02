import { install } from 'source-map-support';
install();

import { resolve } from 'path';

import mkdirp from 'mkdirp-promise';
import PrettyError from 'pretty-error';

import server from './server';
import config from './config';
import logger from './logger';

const pretty = new PrettyError();

let log = logger.create('System', config.defaults().log);

/**
 * Called when the node process is about to exit
 *
 * @param number code Return code of the process
 */
function onExit(code) {
  if (code > 0) {
    log.warning(`Exit: Non-zero exit code of ${code}`);
  } else {
    log.out('Exit: Application is exiting normally');
  }
}
process.on('exit', onExit);

/**
 * Called when the user hits Ctrl-C
 */
function onCtrlC() {
  log.info('Exit: Ctrl-C has been captured');
  process.exit(-1);
}
process.on('SIGINT', onCtrlC);

/**
 * Called when SIGTERM is received or when 'docker stop' is issued
 */
function onSigterm() {
  if (process.env.NODE_DOCKER) {
    log.info('Exit: Docker container is stopping');
  } else {
    log.info('Exit: Receiving term signal');
  }
  process.exit(0);
}
process.on('SIGTERM', onSigterm);

/**
 * Called when an uncaught exception is thrown.
 * The server is wrapped in a try catch, that will throw it's error
 * to be caught here
 *
 * @param object err  Error object
 */
function onUncaughtException(err) {
  log.error('An uncaught exception has been thrown!', pretty.render(err));
  process.exit(1);
}
process.on('uncaughtException', onUncaughtException);

function onError(err) {
  log.error('Server encountered a problem', err);
  if (err.stack) {
    log.error('Stack:\n', pretty.render(err));
  }
  process.exit(1);
}

/**
 * Attempt to launch the server
 * catch and throw any errors
 */
async function start() {
  const packageInfo = require('../../package.json');
  try {
    // Load the application config
    const conf = await config.all();
    const dataDir = conf.paths.data;

    // Create the data directory if it doesn't already exist
    await mkdirp(dataDir);

    // Initialize the logger and create logger instance
    await logger.init(conf);
    log = logger.create('System');
    log.info(`Application name: [${packageInfo.name}]`)
      .info(`Version Number  : [${packageInfo.version}]`)
      .info(`Using [${resolve(dataDir)}] as data folder`);

    await server.start(conf);
  } catch (err) {
    onError(err);
  }
}

start();
