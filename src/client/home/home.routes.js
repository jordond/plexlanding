/**
 * loads the Home.component
 */
function getStates() {
  return [
    {
      state: 'home',
      config: {
        url: '/',
        template: '<home></home>'
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
