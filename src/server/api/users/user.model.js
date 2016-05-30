/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';

import { safelyParseJSON, ensureHttpProtocol } from '../../utils';

export const User = {
  name: 'users',
  schema: {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    comment: {
      type: Sequelize.TEXT
    },
    isExisting: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    approved: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    approvedDate: {
      type: Sequelize.DATE
    }
  }
};

export default User;
