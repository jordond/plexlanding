///<reference path="index.d.ts" />
'use strict';

import * as angular from 'angular';

// App modules
import core from './app/core/core.module';
import home from './app/home/home.module';
import admin from './app/admin/admin.module';

// App style
import './index.scss';

let app =
  angular.module('app', [
    core,
    home,
    admin
  ]);

export default app;