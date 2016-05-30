/**
 * Admin Section
 */

import angular from 'angular';

import core from '../core/core.module';
import ui from '../ui/ui.module';

import routes from './admin.routes';
import adminComponent from './admin.component';

const depends = [core, ui];

export const admin =
  angular
    .module('app.admin', depends)
    .config(routes)
    .component('admin', adminComponent);

export default admin.name;
