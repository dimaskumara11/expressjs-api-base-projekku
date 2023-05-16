module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define("media", {
      path: {
        type: DataTypes.STRING
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