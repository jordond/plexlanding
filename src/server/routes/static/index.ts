'use strict';

import * as express from 'express';
import { createReadStream as stream } from 'fs';
import { join } from 'path';

export default class Statics {
  private _clientPath: string;

  constructor(clientPath: string) {
    this._clientPath = clientPath;
  }

  register(app: express.Application) {
    // All undefined assets should return a 404
    // TODO flesh out an actual error handler
    app.route('/:url(assets|js|fonts|templates)/*')
      .get((req, res) => res.sendStatus(404));

    // All unregistered routes should send index
    app.route('/*')
      .get((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        stream(join(this._clientPath, 'index.html'))
          .pipe(res);
      });

    return Promise.resolve('Statics');
  }
}