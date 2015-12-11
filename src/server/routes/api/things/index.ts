'use strict';

import Routes from './things.routes';
import Model from './things.model';

export default <Route.Api.IEndpoint>{
  name: 'things',
  routes: Routes,
  model: Model
}