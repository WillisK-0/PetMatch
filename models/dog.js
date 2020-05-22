'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    // associations can be defined here
  };
  return Dog;
};