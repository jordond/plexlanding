export function getStates() {
  return [
    {
      state: 'admin.config.about',
      icon: 'help',
      title: 'About',
      config: {
        url: '/about',
        template: '<config-about><h1>about</h1></config-about>'
      }
    },
    {
      state: 'admin.config.general',
      icon: 'subject',
      title: 'General',
      config: {
        url: '/general',
        template: '<config-general><h1>general</h1></config-general>'
      }
    },
    {
      state: 'admin.config.plex',
      icon: 'play_circle_outline',
      title: 'Plex',
      config: {
        url: '/plex',
        template: '<config-plex><h1>plex</h1></config-plex>'
      }
    },
    {
      state: 'admin.config.email',
      icon: 'email',
      title: 'Email',
      config: {
        url: '/email',
        template: '<config-email><h1>email</h1></config-email>'
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
