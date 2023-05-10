module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("company", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      sector_id: {
        type: DataTypes.INTEGER
      },
      logo: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      owner_name: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'company',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    });
    return Company;
};