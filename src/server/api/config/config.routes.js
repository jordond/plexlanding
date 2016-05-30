import Controller from './config.controller';

export function register(router) {
  const ctrl = new Controller();
  router
    .route('/config/')
    .get(ctrl.defaults);

  router
    .route('/config/user')
    .get(ctrl.retrieve)
    .post(ctrl.update);

  router
    .route('/config/email/test')
    .post(ctrl.emailTest)
    .get(ctrl.emailTest);

  router
    .route('/config/email/:id')
    .get(ctrl.emailReview);
}

export default { register };
