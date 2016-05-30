/* eslint indent: 0 */
const template = [
  '<md-button class="md-icon-button" aria-label="{{$ctrl.aria || $ctrl.icon}}" ng-click="$ctrl.action()">',
    '<ng-md-icon icon="{{$ctrl.icon}}" ui-sref="{{$ctrl.href}}" ui-sref-active="active" class="fill-white"></ng-md-icon>',
  '</md-button>',
].join('');

const bindings = {
  icon: '@',
  action: '&?',
  href: '@?',
  aria: '@?'
};

export default { name: 'toolbarButton', bindings, template };
