const createPool = require('mysql2/promise').createPool;

const { USER_MYSQL, PASSWORD_MYSQL, DATABASE_MYSQL, HOST_MYSQL, PORT_MYSQL } = require('./helpers/env.helpers.js')

module.exports = {
  pool: createPool({
    host: HOST_MYSQL,
    user: USER_MYSQL,
    password : PASSWORD_MYSQL,
    database: DATABASE_MYSQL,
    port: PORT_MYSQL
  })
}
