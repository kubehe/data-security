module.exports = (sequelize, DataTypes) => {
  let Note = sequelize.define('Note', {
    title: { type: DataTypes.STRING, unique: true, allowNull: false},
    body: DataTypes.STRING
  });

  Note.associate = function (models) {
    models.Note.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Note;
};