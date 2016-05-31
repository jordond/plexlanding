import { createReadStream } from 'fs';
import { join } from 'path';

import Router from 'koa-router';

import configRoutes from './api/config/config.routes';
import user from './api/users/user.routes';

const router = new Router();

function register(app, config) {
  const endpoints = [user];

  for (const endpoint of endpoints) {
    const { routes, urlBase } = endpoint;
    const apiRouter = new Router({ prefix: `/api${urlBase}` });

    for (const x of routes) {
      const { method, route, handlers } = x;
      const lastHandler = handlers.pop();

      apiRouter[method.toLowerCase()](route, ...handlers, async (ctx) => await lastHandler(ctx));
    }
    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  }

  router.all('/api/', ctx => (ctx.body = { message: 'You\'ve reached the API' }));
  router.all('/api/*', ctx => {
    ctx.status = 404;
    ctx.body = { message: 'Invalid API Route' };
  });

  // Register the static routes
  const indexPath = join(config.paths.root, 'client', 'index.html');
  router.get('/*', async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(indexPath);
  });

  app.use(router.routes()).use(router.allowedMethods());
}

export default { register };
