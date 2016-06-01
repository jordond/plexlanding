import './config.scss';

import templateUrl from './config.tpl.html';
import { getStates as menuItems } from './config.routes';

/** @ngInject */
function controller($state, $mdSidenav) {
  this.menuItems = menuItems();

  this.toggleMenu = () => $mdSidenav('menu').toggle();

  this.goTo = (state) => $state.go(state);

  // Go directly to the about section
  $state.transitionTo('admin.config.about');
}

const bindings = {};

export default { name: 'config', bindings, templateUrl, controller };
