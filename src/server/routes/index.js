import { createReadStream } from 'fs';
import { join } from 'path';

import Router from 'koa-router';
import jwt from 'koa-jwt';

// Api routes
import configRoutes from '../api/config/config.routes';
import user from '../api/users/user.routes';
import admin from '../api/admin/admin.routes';

// Misc routes
import auth from './auth';

import logger from '../logger';

const log = logger.create('Router');

let displayed = false;
function displayInsecureBanner(env) {
  if (displayed) {
    return;
  }
  log.warning('=========================================')
    .warning('=   RUNNING WITH API IN INSECURE MODE   =');
  if (env === 'production') {
    log.warning('No authorization is required to access api')
      .warning('This mode is only intended for development!');
  }
  log.warning('=========================================');
  displayed = true;
}

function register(app, config) {
  const router = new Router();

  // Register each of the api endpoints
  const endpoints = [user, admin];
  for (const endpoint of endpoints) {
    const { routes, urlBase } = endpoint;
    const apiRouter = new Router({ prefix: `/api${urlBase}` });
    for (const x of routes) {
      const { method, route, handlers } = x;
      const lastHandler = handlers.pop();

      // Secure the api, unless flag set in user.config OR endpoint/route has disabled auth
      if (config.secureApi) {
        if (!endpoint.disableAuth && !x.disableAuth) {
          // TODO SWITCH OUT JWT AUTH FOR PLEX AUTHENTICATION
          handlers.unshift(jwt({ secret: config.secrets.session }));
        }
      } else {
        displayInsecureBanner(config.env);
      }

      // Register route with koa-router
      apiRouter[method.toLowerCase()](route, ...handlers, async (ctx) => await lastHandler(ctx));
    }
    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  }

  // Register the api endpoint, and the unknown api endpoint
  router.all('/api/', ctx => (ctx.body = { message: 'You\'ve reached the API' }));

  // Register route for all invalid api endpoints
  router.all('/api/*', ctx => {
    ctx.status = 404;
    ctx.body = { message: 'Invalid API Route' };
  });

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
