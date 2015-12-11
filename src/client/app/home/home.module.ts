'use strict';

/**
 * Module app.home
 * Main entry point for the user
 */

import routes from './home.routes';
import homeDirective from './home.directive';

let dependencies: string[] = [];

let mod =
  angular
    .module('app.home', dependencies)
    .config(routes)
    .directive('home', homeDirective);

export default mod.name;