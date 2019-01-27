const bcrypt = require("bcryptjs");

const setPassword = user => {
  // generating bcrypt password with salt
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
};

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {
      hooks: {
        beforeCreate: setPassword,
        beforeUpdate: setPassword
      }
    }
  );

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function(models) {
    models.User.hasMany(models.Note);
  };

  return User;
};
