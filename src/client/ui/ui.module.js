import coreModule from '../core/core.module';

import toolbarComponent from './toolbar/toolbar.component';
import toolbarButtonComponent from './toolbar/button.component';
import iconButtonComponent from './icon-button.component';

const dependencies = [
  coreModule
];

const ui = angular
  .module('app.ui', dependencies)
  .component(toolbarComponent.name, toolbarComponent)
  .component(toolbarButtonComponent.name, toolbarButtonComponent)
  .component(iconButtonComponent.name, iconButtonComponent);

export default ui.name;
