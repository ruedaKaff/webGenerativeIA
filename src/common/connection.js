import{ createConnection } from "mysql";

import "dotenv/config.js"

const connection = createConnection({
    host: process.env.HOSTNAME,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});


connection.connect();
export

{
    connection
}