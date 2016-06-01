/**
 * Container component that displays each divided part from
 * UI components.
 */
import './admin.scss';

/* eslint indent: 0 */
const template = [
  '<div class="admin" layout="column" layout-fill>',
    '<toolbar></toolbar>',
    '<md-content class="bg-200" flex md-scroll-y layout-fill>',
      '<ui-view layout="column" layout-fill></ui-view>',
    '</md-content>',
  '</div>'
].join('');

/** @ngInject */
function controller($state) {
  $state.go('admin.users');
}

const adminComponent = {
  bindings: {
    name: '@'
  },
  template,
  controller
};

export default adminComponent;
