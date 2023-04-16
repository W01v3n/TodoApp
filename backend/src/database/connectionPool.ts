import mysql from "mysql2/promise";
import dbConfig from "../config/database";
import { connect } from "http2";

const pool: mysql.Pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  multipleStatements: true,
});

// Aquire connection from the pool and check if database is connected
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to database.");
    // Release the connection back to the pool
    connection.release();
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

export default pool;
