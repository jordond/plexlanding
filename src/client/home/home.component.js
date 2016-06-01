/**
 * Container component that displays each divided part from
 * UI components.
 */
import './home.scss';

/* eslint indent: 0 */
const template = [
  '<div class="home" layout="row" layout-align="center center">',
    '<h2>Home Placeholder</h2>',
    '<md-button class="md-accent" ui-sref="admin">Admin</md-button>',
  '</div>'
].join('');

/** @ngInject */
function controller() {

}

const homeComponent = {
  bindings: {
    name: '@'
  },
  template,
  controller
};

export default homeComponent;
