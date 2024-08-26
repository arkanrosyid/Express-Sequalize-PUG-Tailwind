const dotEnv = require('dotenv');

const envFilePath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';dotEnv.config({ path: envFilePath });

  module.exports = {
    APP_NAME : process.env.APP_NAME,
    PORT: process.env.APP_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    ENVIRONMENT: process.env.APP_ENV,

    ACCESS_TOKEN_EXPIRATION_DURATION: process.env.ACCESS_TOKEN_EXPIRES_IN

  };