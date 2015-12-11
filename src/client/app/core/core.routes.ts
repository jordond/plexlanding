'use strict';

/* @ngInject */
export default function configureStates(
  $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
