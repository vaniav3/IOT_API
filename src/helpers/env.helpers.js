const dotenv = require('dotenv')

dotenv.config()

 const USER_MYSQL = process.env.USER_MYSQL
 const PASSWORD_MYSQL = process.env.PASSWORD_MYSQL
 const HOST_MYSQL = process.env.HOST_MYSQL
 const DATABASE_MYSQL = process.env.DATABASE_MYSQL
 const PORT_MYSQL = process.env.PORT_MYSQL
 const LLAVE_JWT = process.env.LLAVE_JWT

 module.exports = {
    USER_MYSQL,
    PASSWORD_MYSQL,
    HOST_MYSQL,
    DATABASE_MYSQL,
    PORT_MYSQL,
    LLAVE_JWT
    }
    