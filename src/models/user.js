'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull : false
    },
    nama: {
      type : DataTypes.STRING,
      allowNull : false
    },
    nip: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('password', bcrypt.hashSync(value, salt));
      }
    },
    role: {
      type : DataTypes.ENUM('admin','guru'),
      allowNull : false
      
    },
    piket: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
      
    },
    remember_token: {
      type : DataTypes.STRING,
      allowNull : true
    },
    token_expire: {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Define the table name
    timestamps: true, // Enable timestamps
  });
  return User;
};


