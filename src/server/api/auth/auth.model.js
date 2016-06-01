/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-as-promised';

export const model = {
  name: 'auth',
  schema: {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING
    }
  }
};

async function hashPassword(instance) {
  if (!instance.changed('password')) {
    return Promise.resolve();
  }
  let salt = instance.get('salt');
  if (!salt) {
    salt = await bcrypt.genSalt(10);
    instance.set('salt', salt);
  }
  const hash = await bcrypt.hash(instance.get('password'), salt);
  instance.set('password', hash);
}

export const hooks = {
  beforeCreate: hashPassword,
  beforeUpdate: hashPassword
};

export const config = {
  hooks,
  freezeTableName: true,
  instanceMethods: {
    toJSON: function () {
      return this.get('username');
    }
  }
};

export default { model, config, hooks };
