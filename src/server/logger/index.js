import { join, resolve } from 'path';
import mkdirp from 'mkdirp-promise';

import Console from './console';
import { init as initWinston } from './file';

const loggerConfig = {};

export function init(config) {
  let { filename, defaultLevel, level } = config.log;
  const log = new Console('Logger', config.log);
  log.debug('Using logger config: ', config.log);

  const logDir = join(config.paths.data, 'logs');
  filename = resolve(join(logDir, filename || 'server.log'));

  return mkdirp(logDir).then(() => {
    defaultLevel = Console.validLevel(defaultLevel) ? defaultLevel.toUpperCase() : 'INFO';

    const isValidLevel = Console.validLevel(level);
    if (!isValidLevel) {
      log.warning(`Invalid log level [${level.toUpperCase()}] defaulting to [${defaultLevel}]`);
    }
    level = isValidLevel ? level.toUpperCase() : defaultLevel;


    initWinston(Object.assign(config.log, { filename }));
    log.info(`Initialized logger with level of [${level}]`)
      .info(`Using [${filename}]`);

    return Object.assign(loggerConfig, config.log);
  });
}

export function create(tag, config) {
  return new Console(tag, config || loggerConfig);
}

export default { init, create, Console };
