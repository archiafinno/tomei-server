'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../utils/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name is required"
        },
        notEmpty: {
          args: true,
          msg: "name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "email is required"
        },
        notEmpty: {
          args: true,
          msg: "email is required"
        },
        isEmail: {
          args: true,
          msg: "your email format is wrong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "password is required"
        },
        notEmpty: {
          args: true,
          msg: "password is required"
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "avatar is required"
        },
        notEmpty: {
          args: true,
          msg: "avatar is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        user.password = encryptPassword(user.password)
      }
    }
  });
  return User;
};