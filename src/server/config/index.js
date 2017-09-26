import { merge } from 'lodash';

import defaultConfig from './defaults';
import User from './user';
import { development, production } from './environments';

export class Config {
  constructor() {
    this.config = this.defaults();
    this.userConfigLoaded = false;
  }

  defaults() {
    const environment = defaultConfig.env === 'production' ? production : development;
    return merge({}, defaultConfig, environment);
  }

  /**
   * Merge the main config files, and load the user config from data dir
   *
   * @param boolean reload  Force a reload of the entire config
   * @returns Promise<object>
   */
  load(reload = false) {
    if (this.userConfigLoaded && !reload) {
      return Promise.resolve(this.config);
    }

    const userConfig = new User();
    return userConfig.read().then((config = {}) => {
      this.config = merge(this.config, config);
      this.userConfigLoaded = true;
      return this.config;
    });
  }

  save(config = {}) {
    const userConfig = new User();
    this.config = merge(this.config, config);
    return userConfig.update(config);
  }

}


export default new Config;
