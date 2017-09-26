import Sequelize from 'sequelize';

import { safelyParseJSON, ensureHttpProtocol } from '../../utils/misc';

// TODO
// Have a flag for requested, approved/rejected, invite pending, and accepted.

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
    requested: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    approved: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    rejected: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    pending: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    friend: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  }
};

export default User;
