import admin from './admin.controller';

export const urlBase = '/admin';

export const routes = [
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      admin.getAdmin,
      admin.update
    ]
  }
];

export default { urlBase, routes };
