import admin from './admin.controller';

export const urlBase = '/admin';

export const routes = [
  {
    method: 'GET',
    route: '/user',
    handlers: [
      admin.getAdmin
    ]
  },
  {
    method: 'PUT',
    route: '/user',
    handlers: [
      admin.getAdmin,
      admin.update
    ]
  }
];

export default { urlBase, routes };
