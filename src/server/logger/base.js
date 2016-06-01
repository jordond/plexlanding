import moment from 'moment';

const LOG_LEVELS = ['ERROR', 'WARN', 'INFO', 'VERBOSE', 'DEBUG', 'SILLY'];

function levelsLength(a) {
  let c = 0, d = 0, l = 0, i = a.length;
  if (i) {
    while (i--) {
      d = a[i].length;
      if (d > c) {
        l = i; c = d;
      }
    }
  }
  return a[l];
}

export default class Base {
  constructor(tag, options = {}) {
    this.tag = tag;
    this.options = Object.assign(options, {
      default: Base.validLevel(options.default) ? options.default : 'INFO',
      level: Base.validLevel(options.level) ? options.level : 'INFO',
      short: options.short || false,
      maxLength: levelsLength(LOG_LEVELS).length
    });
  }

  shouldLog(outLevel) {
    const out = outLevel.trim().toUpperCase();
    const outIndex = LOG_LEVELS.indexOf(out);
    const level = this.options.level.toUpperCase();
    const levelIndex = LOG_LEVELS.indexOf(level);

    if (levelIndex >= outIndex && levelIndex !== -1) {
      return true;
    } else if (levelIndex === -1) {
      return outIndex <= LOG_LEVELS.indexOf(this.options.default.toUpperCase());
    }
    return false;
  }

  formatHeader(level, tag) {
    if (this.options.short) {
      level = level.charAt(0).toUpperCase();
    } else if (this.options.maxLength > level.length) {
      const diff = this.options.maxLength - level.length;
      level = level.toUpperCase() + ' '.repeat(diff);
    } else {
      level = level.toUpperCase().slice(0, this.options.maxLength);
    }
    return `[${level}][${tag}]`;
  }

  timestamp(pattern) {
    return `[${moment().format(pattern || 'YY/DD/MM|HH:mm:ss')}]`;
  }

  static validLevel(desired) {
    if (!desired) {
      return false;
    }
    return LOG_LEVELS.indexOf(desired.toUpperCase()) !== -1;
  }
}
