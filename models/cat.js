'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING
  }, {});
  Cat.associate = function(models) {
    // associations can be defined here
  };
  return Cat;
};