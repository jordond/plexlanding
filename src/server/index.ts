/// <reference path="./index.d.ts" />
'use strict';

require('babel-polyfill');

import * as fs from 'fs';
import * as path from 'path';
import { argv as args } from 'yargs';

import App from './core/app';
import { default as initConfig } from './config/index';
import { default as onExit } from './core/exit';

import { ExecutionTimer, Uptime } from './utils/execution';
import * as Logger from './utils/logger/index';

let _uptime = new Uptime();

/**
 * POC for now
 */
onExit((exitCode: number) => {
  let log = Logger.create('Report');
  if (exitCode !== 0) {
    log.warning('Server is exiting with a non-zero code [' + exitCode + ']');
  } else {
    log.info('Server is exiting cleanly');
  }
  log.info('Server had been running since [' + _uptime.toString() + ']')
    .verbose('Server Start [' + _uptime.prettyDate(_uptime.Start) + ']')
    .verbose('Percise server uptime [' + _uptime.Timer.toString() + ']');
});

/**
 * Load the configuration either from the default path
 * or from the command line
 */
let userConfigPath: string = (args.c || args.config) || path.join(__dirname, '../config.json');
fs.readFile(path.resolve(userConfigPath), (err: any, data: any) => {
  if (err) {
    Logger.create('Init')
      .warning('Config file [' + userConfigPath + '] not found, using defaults.')
      .info('Create config in [' + path.resolve(path.join(__dirname, '..')) + ']')
      .info('Or add flag "--config=/path/to/config"');
    data = {};
  }
  initConfig(JSON.parse(data))
    .then((config: Config.IConfig) => Logger.init(config))
    .then(bootstrapServer)
    .catch(failed);
});

/**
 * Initialize the server with the configuration
 * @param {Config.IConfig}  config  Merged configuration object
 */
function bootstrapServer(config: Config.IConfig) {
  let log = Logger.create('Init');
  let timer = new ExecutionTimer();

  log.info('Bootstrapping server instance')
     .debug('Using following config: ', config);

  new App(config)
    .init()
    .then(() => {
      log.info('Server has been initialized')
         .info('Initialization time [' + timer.toString() + ']');
    })
    .catch(failed);
}

function failed(err: any) {
  let log = Logger.create('App');
  log.error('Server encountered a problem: ', err);
  if (err.stack) {
    log.error('Stack:\n', err.stack);
  }
  process.exit(1);
}
