'use strict';

/* @ngInject */
export default function configureStates($stateProvider: ng.ui.IStateProvider) {
  let states = getStates();
  states.forEach((state) => $stateProvider.state(state.state, state.config));
}

function getStates(): IRoute[] {
  return [
    {
      state: 'home',
      config: {
        name: 'home',
        url: '/',
        template: '<home name="test"></home>',
        data: {
          misc: 'Hello world'
        }
      }
    }
  ];
}