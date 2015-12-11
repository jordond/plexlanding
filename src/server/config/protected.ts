/**
 * Protected configuation values that cannot be overwritten
 * by the user.  Any options in here will take precedence over
 * the user configuation file.  For safety.
 */
'use strict';

export default <Config.IConfig>{
  env: {
    valid: ['production', 'development'],
    default: 'development'
  },
  api: {
    secure: false // Not implemented so forcing to false
  }
}
