import { join } from 'path';
import fs from 'fs';

import { merge } from 'lodash';
import jsonfile from 'jsonfile';

import defaults from './defaults';
import logger from '../logger';
import { emit } from '../sockets';

const configPath = join(defaults.paths.data, 'user.config.json');

class UserConfig {
  read() {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(configPath, (err, obj) => resolve(obj || {}));
    });
  }

  update(config) {
    const log = logger.create('Config:User');
    return this.read().then((savedConfig) => {
      const merged = merge({}, savedConfig, config);
      log.debug('Saving new config: ', config);
      emit('userconfig:save', config);
      jsonfile.writeFile(configPath, merged, { spaces: 2 }, (err) => {
        if (err) {
          log.error('Saving config failed', err);
          throw err;
        }
        return;
      });
    });
  }
}

export default UserConfig;
