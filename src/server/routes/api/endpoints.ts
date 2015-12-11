'use strict';

/**
 * Import endpoints, should contain
 * Name, Model, Routes, Socket
 */

// ===========================================

import Things from './things/index';

let routes: Route.Api.IEndpoint[] = [
  Things
];

// ===========================================

export default routes;