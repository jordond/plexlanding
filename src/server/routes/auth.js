import Router from 'koa-router';

import PlexTV from '../plex/plextv';

export async function authenticate(ctx) {
  const { login, password } = ctx.request.body;
  if (!login || !password) {
    ctx.throw(400, 'Missing credentials');
  }
  try {
    // Create plextv object

    // Try to authenticate

    // Store token in config?

    // Return 200
  } catch (err) {
    ctx.throw(422, err);
  }
}

export function register(app) {
  const router = new Router();
}

export default { register };
