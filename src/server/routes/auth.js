import Router from 'koa-router';

import Config from '../config';
import Plex from '../plex';
import logger from '../logger';

export async function authenticate(ctx) {
  const { login, password } = ctx.request.body;
  if (!login || !password) {
    ctx.throw(400, 'Missing credentials');
  }
  try {
    const plex = new Plex.Client();
    const user = await plex.authenticate(login, password);

    if (!user) {
      ctx.throw(401);
    }

    const token = user.authentication_token;

    const log = logger.create('Auth');
    log.info('Successfully authenticated with Plex.tv')
      .verbose('Saving Plex access token to config file');

    Config.save({ plex: { token } });
    ctx.body = { user: { token } };
  } catch (err) {
    ctx.throw(err.statusCode, { status: err.statusCode, data: err.error });
  }
}

export default { authenticate };
