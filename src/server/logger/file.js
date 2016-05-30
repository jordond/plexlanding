import winston from 'winston';

const MEGABYTE = 1000 * 1024;

let wasInit = false;

export function init(config) {
  const winstonOptions = {
    level: config.level.toLowerCase(),
    filename: config.filename,
    maxSize: (config.maxSize || 50) * MEGABYTE,
    maxFiles: 3
  };
  winston.add(winston.transports.File, winstonOptions);
  winston.remove(winston.transports.Console);
  wasInit = true;
}

export function log(tag, item) {
  if (wasInit) {
    winston.log(item.level.toLowerCase(), item.message, Object.assign(item.data, { tag }));
  }
  return wasInit;
}

export default { init, log };
