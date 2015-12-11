'use strict';

import { Router } from 'express';
import Controller from './things.controller';

export default class Routes implements Route.Api.IRoute {
  register(router: Router) {
    let ctrl = new Controller();

    router
      .route('/things')
      .get(ctrl.all)
      .post(ctrl.create);

    router
      .route('/things/:id')
      .get(ctrl.show);

    return Promise.resolve();
  }
}