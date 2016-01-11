'use strict';

// Core vendor css
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';

// Core vendor libs
// NOTE Using non-ES6 due to Typescript default exports bug
let ngAnimate  = require('angular-animate');
let ngUiRouter = require('angular-ui-router');
let ngMaterial = require('angular-material');

// Core module config
import routing from './core.routes';
import theme from './theme.config';

// Cross app modules
import ui from '../ui/ui.module';

let dependencies: string[] = [
 /* Angular modules */
  ngAnimate,

 /* Cross-app modules */
  ui,

 /* 3rd party modules */
  ngUiRouter,
  ngMaterial
];

let core =
  angular
    .module('app.core', dependencies)
    .config(routing)
    .config(theme);

export default core.name;