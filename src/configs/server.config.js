require("dotenv").config();

module.exports = {
    PORT : process.env.PORT || 3000,
    DB_URL : process.env.DB_URL,
    NODE_ENV : process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'help404'
}


