import { createReadStream } from 'fs';
import { join } from 'path';

import Router from 'koa-router';

import api from './api';
import auth from './auth';

import logger from '../logger';

const log = logger.create('Router');

function register(app, config) {
  const router = new Router();

  // Register the api routes
  api.register(router, config.secureApi);

  if (!config.secureApi) {
    api.displayInsecureBanner(config.env);
  }

  // Register non-api routes
  router.post('/login', auth.authenticate);

  // Register the static routes
  const indexPath = join(config.paths.root, 'client', 'index.html');
  router.get('/*', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(indexPath);
    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());
}

export default { register };
