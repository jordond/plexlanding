'use strict';

/**
 * Module app.ui
 * Ui components
 */

// UI Components
import plexStatus from './plex-status/plex-status.directive';

let mod =
  angular
    .module('app.ui', [])
    .directive('plexStatus', plexStatus);

export default mod.name;