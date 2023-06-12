import { createPool } from 'mysql2'

import { USER_MYSQL, PASSWORD_MYSQL, DATABASE_MYSQL, HOST_MYSQL, PORT_MYSQL } from './helpers/env.helpers.js'

export const pool = createPool({
  host: HOST_MYSQL,
  user: USER_MYSQL,
  password : PASSWORD_MYSQL,
  database: DATABASE_MYSQL,
  port: PORT_MYSQL
});
