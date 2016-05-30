/**
 * loads the Home.component
 */
function getStates() {
  return [
    {
      state: 'admin',
      config: {
        url: '/admin',
        template: '<admin layout-fill></admin>'
      }
    },
    {
      state: 'admin.users',
      config: {
        url: '/users',
        template: '<users></users>'
      }
    },
    {
      state: 'admin.config',
      config: {
        url: '/config',
        template: '<config layout-fill></config>'
      }
    }
  ];
}

/** @ngInject */
export default function configureStates($stateProvider) {
  const states = getStates();
  states.forEach((state) => $stateProvider.state(state.state, state.config));
  return states;
}
