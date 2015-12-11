'use strict';

/* @ngInject */
export default function configureStates($stateProvider: ng.ui.IStateProvider) {
  let states = getStates();
  states.forEach((state) => $stateProvider.state(state.state, state.config));
}

function getStates(): IRoute[] {
  return [
    {
      state: 'admin',
      config: {
        name: 'admin',
        url: '/admin',
        template: '<div class="admin test"></div>',
        data: {
          misc: 'Hello world 2'
        }
      }
    }
  ];
}
