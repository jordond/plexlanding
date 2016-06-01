/**
 * Core module which contains all of the apps deps
 */

import angular from 'angular';

import 'angular-material/angular-material.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'normalize.css/normalize.css';
import './core.scss';

// Core vendor libs
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngUiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngIcons from 'angular-material-icons';
import ngSocketIo from 'angular-socket-io';

import config from './core.config';
import materialTheme from './theme.config';
import socketService from './socket.service';

const dependencies = [
 /* Angular modules */
  ngAnimate,
  ngMessages,
  ngMaterial,

 /* Cross-app modules */

 /* 3rd party modules */
  ngUiRouter,
  ngIcons,
  'btford.socket-io'
];

export const module =
  angular
    .module('app.core', dependencies)
    .service('socketService', socketService)
    .config(config)
    .config(materialTheme);

export default module.name;
