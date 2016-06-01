import Database from '../../database';
import { createHttpError } from '../../utils';
import logger from '../../logger';

const models = Database.models;
const log = logger.create('User:Ctrl');

export async function all(ctx) {
  const users = await models.User.findAll();
  ctx.body = { users };
}

export async function create(ctx) {
  const user = ctx.request.body;
  // TODO talk to plex api
  try {
    const created = await models.User.create(user);
    log.verbose(`Creating new user [${user.email}]`);
    ctx.body = { user: created.get() };
  } catch (err) {
    ctx.throw(422, err);
  }
}

export async function getUser(ctx, next) {
  const user = await models.User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, `User ${ctx.params.id} could not be found`);
  }
  ctx.body = { user };

  if (next) {
    return next();
  }
}

export async function update(ctx) {
  const user = ctx.body.user;

  Object.assign(user, ctx.request.body);
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
