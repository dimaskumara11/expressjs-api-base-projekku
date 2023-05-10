module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define("media", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      filename: {
        type: DataTypes.STRING
      },
      is_used: {
        type: DataTypes.INTEGER
      },
      created_at: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'media',
      timestamps: false,
    });
    return Media;
};