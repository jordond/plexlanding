/**
 * App route configuration
 *
 * Enable html5 mode and redirect all routes to `/`
 */

/** @ngInject */
export default function configureStates($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
