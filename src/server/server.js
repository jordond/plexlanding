import { join } from 'path';

import Koa from 'koa';
import convert from 'koa-convert';
import favicon from 'koa-favicon';
import compress from 'koa-compress';
import morgan from 'koa-morgan';
import helmet from 'koa-helmet';
import koaSession from 'koa-session';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import hat from 'hat';
import PrettyError from 'pretty-error';

import errorHandler from './middleware/error';
import configuration from './config';
import logger from './logger';
import database from './database';
import sockets from './sockets';
import routes from './routes';

const pretty = new PrettyError();
const app = new Koa();

export async function start(config) {
  if (!config) {
    throw new Error('No config was passed to server');
  }

  const log = logger.create('Server');

  // If the secrets session hasn't been initialized, do so
  if (config.secrets.session === 'REPLACE') {
    log.info('Randomly generating new session secret');
    const session = { session: hat() };
    config.secrets.session = session.session;
    new configuration.User().update({ secrets: session });
  }

  // Set up the server
  app.keys = [config.secrets.session];
  app.use(convert(koaSession(app)));

  // Logging middleware
  if (config.env === 'production') {
    app.use(morgan('short', { skip: (req, res) => res.statusCode < 400 }));
  } else {
    app.use(morgan('dev'));
  }
  app.use(compress());
  app.use(bodyParser());
  app.use(convert(helmet()));
  app.use(errorHandler());

  // Serving files
  app.use(convert(serve(config.paths.root)));
  app.use(favicon(join(config.paths.root, 'favicon.ico')));

  // Register all server components
  log.info('Initializing server components').debug('Using config', config);
  await database.init(config);
  routes.register(app, config); // TODO renable once I get koa situated
  sockets.register(app);

  app.listen(config.port, (err) => {
    if (err) {
      log.error(`Error listening on port :${config.port}`);
      throw err;
    } else {
      log.info(`✅ OK ${config.title} is running on http://localhost:${config.port}.`);
      return Promise.resolve();
    }
  });
}

export default { start };
