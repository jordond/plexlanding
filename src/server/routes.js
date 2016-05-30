import express from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

import configRoutes from './api/config/config.routes';
import userRoutes from './api/users/user.routes';

function register(app, config) {
  // Register the api routes
  const apiRouter = express.Router();

  configRoutes.register(apiRouter);
  userRoutes.register(apiRouter);

  apiRouter.route('/').all((req, res) => res.status(200).json('You\'ve reached the API'));
  apiRouter.route('/*').all((req, res) => res.status(404).json('Invalid API Route'));

  app.use('/api', apiRouter);

  // Register the static routes
  app.route('/*')
  .get((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    createReadStream(join(config.paths.root, 'client', 'index.html')).pipe(res);
  });

  Promise.resolve();
}

export default { register };
