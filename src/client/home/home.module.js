/**
 * Main Section
 *
 * Consists of a single component that uses directives/components from
 * the UI module
 */

import angular from 'angular';

import core from '../core/core.module';
import ui from '../ui/ui.module';

import routes from './home.routes';
import homeComponent from './home.component';

const depends = [core, ui];

export const home =
  angular
    .module('app.home', depends)
    .config(routes)
    .component('home', homeComponent);

export default home.name;
