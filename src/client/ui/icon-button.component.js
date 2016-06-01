/* eslint indent: 0 */
const template = [
  '<md-button class="md-icon-button" aria-label="{{$ctrl.aria || $ctrl.icon}}" ng-click="$ctrl.action()">',
    '<ng-md-icon icon="{{$ctrl.icon}}" style="fill: {{$ctrl.fill || \'white\'}}"></ng-md-icon>',
  '</md-button>',
].join('');

const bindings = {
  icon: '@',
  fill: '@?',
  action: '&?',
  aria: '@?'
};

export default { name: 'iconButton', bindings, template };
