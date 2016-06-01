import { merge } from 'lodash';

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
export function all(reload = true) {
  if (fullConfig && !reload) {
    return Promise.resolve(fullConfig);
  }

  const userConfig = new User();
  return userConfig.read().then((config = {}) => {
    fullConfig = merge(defaults(), config);
    return fullConfig;
  });
}

export default { all, defaults, User };
