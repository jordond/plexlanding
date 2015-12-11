'use strict';

import { IModel } from '../../core/components/database';
import * as Sequelize from 'sequelize';

export interface IThings {
  title: string;
  description: string;
}

let Things: Route.Api.IModel = {
  name: 'things',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  },
  methods: {
    classMethods: {
      // Example association
      // associate: (models: IModel) => {
      //   models['things'].belongsTo(models['stuff']);
      // }
    },
    instanceMethods: function() {
      console.log('instanceMethod test');
    }
  }
};

export default Things;