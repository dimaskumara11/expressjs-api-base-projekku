const database = {
  mysql_portofolio: {
      host: '127.0.0.1',
      port: '3306',
      database: 'dimas_api_test',
      username: 'root',
      password: '',
      dialect: "mysql",
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  }
};
module.exports = database;