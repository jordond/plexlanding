import Sequelize from 'sequelize';

import { safelyParseJSON, ensureHttpProtocol } from '../../utils/misc';

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
    }
  }
};

export default User;
