'use strict';

import { Request, Response } from 'express';
import { Model } from 'sequelize';

import { database } from '../../../core/components/database';
import { IThings } from './things.model';

let Things: Model<any, any>;

export default class Controller implements Route.Api.IController {
  constructor() {
    Things = database().models['things'];
  }

  all(req: Request, res: Response) {
    Things
      .findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(500).json(err));
  }

  create(req: Request, res: Response) {
    let newThing: IThings = {
      title: req.body.title,
      description: req.body.description
    };

    Things
      .create(newThing)
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(500).json(err));
  }

  show(req: Request, res: Response) {
    Things
      .findById(req.params.id)
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(404).json(err));
  }

}