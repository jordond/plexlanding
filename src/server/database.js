import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import logger from './logger';
import { emit } from './sockets';
import { User as modelUser } from './api/users/user.model';
import Admin from './api/admin/admin.model';

const log = logger.create('Database');

const database = {};
const models = {};

async function init(config) {
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.paths.data, 'database.sqlite'),
    logging: (sql) => log.debug('[SQL]\n', sql)
  };

  // Create instances of database and table
  const { name, username, password } = config.database;
  database.instance = new Sequelize(name, username, password, options);

  // Models
  models.User = database.instance.define(modelUser.name, modelUser.schema);
  models.Admin = database.instance.define(Admin.model.name, Admin.model.schema, Admin.config);

  // Register associations

  // Register model hooks // TODO implement when sockets are ready
  // userInstance.afterCreate('create', () => {});
  // userInstance.afterDelete('delete', (document = {}) => emit('users:delete', document));

  if (config.database.force) {
    log.warning('Dropping tables before creating').warning('Disable in [user.config.json:force]');
  }

  const promises = [];
  for (const key of Object.keys(models)) {
    promises.push(models[key].sync({ force: config.database.force }));
  }

  await Promise.all(promises);

  // Check to see if there is an admin user, if not seed from config
  const adminUser = await models.Admin.count();
  if (adminUser === 0) {
    log.info('No admin user was found, creating default')
      .info(`Username: [${config.defaultUser.username}]`)
      .info(`Password: [${config.defaultUser.password}]`)
      .warning('Please change the username and password as soon as possible');
    return models.Admin.create(config.defaultUser);
  }
}

export default { init, database, models };
