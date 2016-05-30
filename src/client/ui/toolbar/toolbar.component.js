import './toolbar.scss';

/* eslint indent: 0 */
const template = [
  '<md-toolbar>',
    '<div class="md-toolbar-tools">',
      '<ng-md-icon icon="play_circle_outline" ui-sref="admin.users" class="fill-accent"></ng-md-icon>',
      '<h3 ui-sref="admin.users">Plex <span>Landing</span></h3>',
      '<span flex></span>',
      '<toolbar-button icon="home" href="home"></toolbar-button>',
      '<toolbar-button icon="group" href="admin.users"></toolbar-button>',
      '<toolbar-button icon="settings" href="admin.config"></toolbar-button>',
    '</div>',
  '</md-toolbar>',
].join('');

const toolbar = { name: 'toolbar', template };

export default toolbar;
