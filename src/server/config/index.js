import { merge, isEmpty } from 'lodash';

import defaultConfig from './defaults';
import User from './user';
import { development, production } from './environments';

let fullConfig = {};

export function defaults() {
  const environment = defaultConfig.env === 'production' ? production : development;
  return merge({}, defaultConfig, environment);
}

/**
 * Merge the main config files, and load the user config from data dir
 *
 * @param boolean reload  Force a reload of the entire config
 * @returns Promise<object>
 */
export function load(reload = false) {
  if (!isEmpty(fullConfig) && !reload) {
    return Promise.resolve(fullConfig);
  }

  const userConfig = new User();
  return userConfig.read().then((config = {}) => {
    fullConfig = merge(defaults(), config);
    return fullConfig;
  });
}

export function save(config = {}) {
  const userConfig = new User();
  fullConfig = merge(fullConfig, config);
  return userConfig.update(config);
}

export default { load, defaults, User, save };
