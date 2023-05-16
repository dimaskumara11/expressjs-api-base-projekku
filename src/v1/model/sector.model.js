module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define("sector", {
      name: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'sector',
      timestamps: false
    });
    return Sector;
};