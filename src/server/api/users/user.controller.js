import { User } from '../../database';
import { createHttpError } from '../../utils';
import logger from '../../logger';

const log = logger.create('User:Ctrl');

export async function all(ctx) {
  const users = await User().findAll();
  ctx.body = { users };
}

export async function create(ctx) {
  const user = ctx.request.body.user;
  // TODO talk to plex api
  log.info(`Creating new user [${user.username}]`);
  try {
    const created = await User().create(user);
    ctx.body = { user: created.get() };
  } catch (err) {
    ctx.throw(422, err.message);
  }
}

export async function getUser(ctx, next) {
  try {
    const user = await User().findById(ctx.params.id);
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = { user };
  } catch (err) {
    if (err === 404) {
      ctx.throw(404);
    }
    ctx.throw(500);
  }

  if (next) {
    return next();
  }
}

export async function update(ctx) {
  // TODO use middleware to auto grab the user
  const user = ctx.body.user;

  Object.assign(user, ctx.request.body.user);
  await user.save();

  ctx.body = { user };
}

export async function destroy(ctx) {
  const user = ctx.body.user;
  log.info(`Deleting user with id of ${user.id}`);

  await user.destroy();

  ctx.status = 200;
  ctx.body = { success: true };
}

export default { all, create, getUser, update, destroy };
