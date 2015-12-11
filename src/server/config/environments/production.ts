/**
 * Put production specific configuration here
 */

'use strict';

export default <Config.IConfig>{
  port: process.env.PORT || 80,

  log: {
    level: 'INFO',
    short: true
  },

  database: {
    name: 'prod-data'
  }

};