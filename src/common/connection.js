import { createPool } from 'mysql2/promise';

import 'dotenv/config.js';

// Create a MySQL connection pool
const pool = createPool({
  connectionLimit: 10, // Adjust based on your application's needs
  host: process.env.HOSTNAME,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});


export { pool };



