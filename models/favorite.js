"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define("favorite", {
    name: DataTypes.STRING,
    petid: DataTypes.STRING,
    userid: DataTypes.INTEGER,
  });
  favorite.associate = function (models) {
    models.favorite.belongsTo(models.User, {
      as: "User",
      foreignKey: "blog_id",
    });
  };
  return favorite;
};
