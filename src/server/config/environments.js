export const development = {
  database: {
    username: 'admin',
    password: null,
    filename: 'database_dev.sqlite',
    force: process.env.FORCE_CREATE || false
  },

  log: {
    filename: 'server_dev.log',
    level: 'DEBUG'
  }
};

export const production = {
  database: {
    username: 'admin',
    password: null,
    filename: 'database_prod.sqlite'
  },

  log: {
    level: 'VERBOSE',
    short: true
  }
};

export default { development, production };
