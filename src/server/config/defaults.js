import { join } from 'path';

const distDir = join(__dirname, '../../..', 'dist');

export default {

  title: 'Plex Landing',

  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || 6969,

  paths: {
    root: distDir,
    data: join(process.env.DATA_DIR || distDir, 'data')
  },

  defaultUser: {
    username: 'admin',
    password: 'admin'
  },

  secureApi: false,

  database: {
    options: {
      dialect: 'sqlite',
      storage: join(distDir, 'data'),
    },
    name: 'plex-landing',
    username: 'admin',
    password: null,
    filename: 'database.sqlite',
    force: false
  },

  log: {
    filename: 'server.log',
    maxSize: 50,
    level: 'INFO',
    short: false,
    default: 'INFO'
  },

  secrets: {
    session: 'REPLACE'
  },

  email: {
    fromName: 'Plex Landing',
    from: 'noreply@youremail.ca',
    smtp: {
      server: '',
      port: '',
      user: '',
      password: '',
      tls: true
    }
  }

};
