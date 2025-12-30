import mysql from "mysql2/promise";

let pool: mysql.Pool;

export function getDB() {
  if (!pool) {
    const config = useRuntimeConfig();

    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      port: config.db.port,
      connectionLimit: 10,
    });
  }

  return pool;
}
