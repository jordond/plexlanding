import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import logger from './logger';
import { emit } from './sockets';
import { User as modelUser } from './api/users/user.model';

const log = logger.create('Database');

const database = {};
const models = {};

function registerSocketEvents(instance, name, secure) {
  const onSave = document => emit(`${name}:save`, document, secure);
  instance.afterCreate(onSave);
  instance.afterUpdate(onSave);
  instance.afterDelete(document => emit(`${name}:delete`, document, secure));
}

async function init(config) {
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.paths.data, config.database.filename),
    logging: (sql) => log.debug('[SQL]\n', sql)
  };

  // Create instances of database and table
  const { name, username, password } = config.database;
  database.instance = new Sequelize(name, username, password, options);

  // Models
  models.User = database.instance.define(modelUser.name, modelUser.schema);

  // Register events
  registerSocketEvents(models.User, 'user', true);

  if (config.database.force) {
    log.warning('Dropping tables before creating').warning('Disable in [user.config.json:force]');
  }

  const promises = [];
  for (const key of Object.keys(models)) {
    promises.push(models[key].sync({ force: config.database.force }));
  }

  await Promise.all(promises);
}

export default { init, database, models };
