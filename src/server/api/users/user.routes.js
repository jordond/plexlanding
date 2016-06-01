import user from './user.controller';

export const urlBase = '/users';

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      user.all
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      user.create
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      user.getUser
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      user.getUser,
      user.update
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      user.getUser,
      user.destroy
    ]
  }
];

export default { urlBase, routes };
