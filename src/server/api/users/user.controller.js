import { User } from '../../database';
import { createHttpError } from '../../utils';
import logger from '../../logger';

const log = logger.create('User:Ctrl');

function notFound(res) {
  return res.status(404).json('User not found');
}

function errorHandler(err, res) {
  log.error('ErrorHandler: ', err);
  return res.status(500).json(err);
}

class Controller {
  all(req, res) {
    User()
      .findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => errorHandler(err, res));
  }

  create(req, res) {
    const url = req.body.url;

    // TODO talk to plex api
    log.info(`Creating new user [${name}]`);
    User()
      .create({ url, name })
      .then((value) => res.status(200).json(value))
      .catch((err) => errorHandler(err, res));
  }

  approve(req, res) {
    User().findById(req.params.id)
      .then((user) => {
        if (!user) {
          return notFound(res);
        }
        return user.update(req.body)
          .then((result) => res.status(200).json(result));
      })
      .catch((err) => errorHandler(err, res));
  }

  destroy(req, res) {
    const id = req.params.id;
    log.info(`Deleting user with id of ${id}`);
    User()
      .destroy({ where: { id }, individualHooks: true })
      .then((rowsDeleted) => res.status(200).json(rowsDeleted))
      .catch((err) => errorHandler(err, res));
  }
}

export default Controller;
