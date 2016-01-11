'use strict';

/* @ngInject */
export default function configureTheme($mdThemingProvider: ng.material.IThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey', {
      'default': '800'
    })
    .accentPalette('orange');
}