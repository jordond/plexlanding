import { join } from 'path';
import { type, release } from 'os';

const distDir = join(__dirname, '../../..', 'dist');

// TODO check to make sure if env.DATA_DIR exists check if its writeable
const dataDir = join(process.env.DATA_DIR || distDir, 'data');

export default {

  title: 'Plex Landing', // Add a custom name for your server

  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || 6969,

  paths: {
    root: distDir,
    data: dataDir
  },

  secureApi: false,

  database: {
    options: {
      dialect: 'sqlite'
    },
    name: 'plex-landing',
    username: 'admin',
    password: null,
    filename: 'database.db',
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
    session: ''
  },

  plex: {
    url: 'https://app.plex.tv/web/app',
    hostname: 'localhost',
    port: 32400,
    token: '',
    identifier: '',
    headers: {
      'X-Plex-Platform': type(),
      'X-Plex-Platform-Version': release(),
      'X-Plex-Product': 'Plex Landing',
      'X-Plex-Device-Name': 'Plex Landing'
    }
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
