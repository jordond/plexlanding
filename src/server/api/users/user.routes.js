import Controller from './user.controller';

export function register(router) {
  const ctrl = new Controller();
  router
    .route('/users')
    .get(ctrl.all)
    .post(ctrl.create);

  router
    .route('/users/:id')
    .post(ctrl.approve)
    .delete(ctrl.destroy);
}

export default { register };
