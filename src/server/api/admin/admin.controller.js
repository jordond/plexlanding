import Database from '../../database';
import logger from '../../logger';

const models = Database.models;
const log = logger.create('Admin:Ctrl');

export async function login(ctx) {
  // TODO implement this else where? so its not behind the api route?
}

export async function getAdmin(ctx, next) {
  const admin = await models.Admin.fineOne();
  if (!admin) {
    ctx.throw(404, 'Could not retrieve admin user');
  }
  ctx.body = { admin };

  if (next) {
    return next();
  }
}

export async function update(ctx) {
  const admin = ctx.body.admin;
  Object.assign(admin, ctx.request.body);

  await admin.save();

  ctx.body = { admin };
}

export default { login, getAdmin, update };
