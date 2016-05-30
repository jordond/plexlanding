/** @ngInject */
export function setTheme($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.definePalette('primary', {
    50: '#858585',
    100: '#5e5e5e',
    200: '#424242',
    300: '#1f1f1f',
    400: '#0f0f0f',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
    A100: '#858585',
    A200: '#5e5e5e',
    A400: '#0f0f0f',
    A700: '#000000',
    contrastDefaultColor: 'light',
    contrastDarkColors: '50 A200'
  });

  $mdThemingProvider.definePalette('accent', {
    50: '#ffffff',
    100: '#ffdebd',
    200: '#ffc285',
    300: '#ff9e3d',
    400: '#ff8f1f',
    500: '#ff8000',
    600: '#e07100',
    700: '#c26100',
    800: '#a35200',
    900: '#854300',
    A100: '#ffffff',
    A200: '#ffdebd',
    A400: '#ff8f1f',
    A700: '#c26100',
    contrastDefaultColor: 'light',
    contrastDarkColors: '50 100 200 300 400 500 600 A100 A200 A400'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('primary', {
      default: '500',
      'hue-1': '400',
      'hue-2': '500',
      'hue-3': 'A200'
    })
    .accentPalette('accent', {
      default: '400',
      'hue-1': '300',
      'hue-2': '500',
      'hue-3': 'A200'
    })
    .dark();

  $mdThemingProvider.theme('config')
    .primaryPalette('orange', {
      default: '400'
    });

  $mdIconProvider.defaultFontSet('FontAwesome').fontSet('fa', 'FontAwesome');
}

export default setTheme;
