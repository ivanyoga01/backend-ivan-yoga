require('dotenv').config(); // this is important!

module.exports = {
  dbConfig: {
    app: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      define: {
        freezeTableName: true,
      },
      pool: {
        max: 100,
        min: 10,
        acquire: 30000,
        idle: 10000,
      },
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
      logging: false,
      timezone: '+07:00',
    },
  },
  appConfig: {
    secret: process.env.SECRET,
    refreshTokenSecret: process.env.SECRET_REFRESH_TOKEN,
    verifiedSecret: process.env.SECRET_VERIFIED,
  },
};
