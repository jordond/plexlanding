import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import logger from './logger';
import { emit } from './sockets';
import { User as modelUser } from './api/users/user.model';

const log = logger.create('Database');

const globalConfig = {};
let dbInstance, userInstance = {};

function init(config) {
  Object.assign(globalConfig, config);
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.paths.data, 'database.sqlite'),
    logging: (sql) => log.debug('[SQL]\n', sql)
  };

  // Create instances of database and table
  const { name, username, password } = config.database;
  dbInstance = new Sequelize(name, username, password, options);
  userInstance = dbInstance.define(modelUser.name, modelUser.schema);

  // Register associations

  // Register model hooks
  // userInstance.afterCreate('create', () => {});
  // userInstance.afterDelete('delete', (document = {}) => emit('users:delete', document));
  // userInstance.afterUpdate('update', () => {});

  if (config.database.force) {
    log.warning('Dropping tables before creating').warning('Disable in [user.config.json:force]');
  }

  const tables = [userInstance];
  const promises = [];
  for (const table of tables) {
    promises.push(table.sync({ force: config.database.force }));
  }

  return Promise.all(promises);
}

export function sequelize() {
  return dbInstance;
}

export function User() {
  return userInstance;
}

export default { init, sequelize, User };
