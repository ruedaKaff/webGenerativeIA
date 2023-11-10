  import "dotenv/config.js";

  import { connection } from "./common/connection.js";
  import express, { json } from "express";
  import cors from "cors";
  import path, { dirname } from "path";
  import { fileURLToPath } from "url";
  // import morgan from "morgan";
  import expressSession from "express-session";
  import MySQLStore from "express-mysql-session";
  // import connectSqlite3 from "connect-sqlite3";

  import { generative } from "./routes/generative_routes.js";
  import { community } from "./routes/community_routes.js";
  import { nlp } from "./routes/nlp_routes.js";
  import { login } from "./routes/auth_route.js";

  const sessionStore = new MySQLStore(
    {
      //60000 in milliseconds (1 day)
      expiration: 86400000, // Session expiration time in milliseconds (1 day)
      createDatabaseTable: true, // Create the sessions table if it doesn't exist
      schema: {
        tableName: "session", // Specify a custom table name
      },
    },
    connection
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const app = express();

  app
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(cors())
    .use(json())
    .use("/generative", generative)
    .use("/nlp", nlp)
    // .use("/img-procesing", image-procesing)
    // .use("/llm", chat)
    .use("/community", community)
  .use("/login", login)
  .use(express.static(path.join(__dirname, "utilities")))
  .use(expressSession({
    secret: 'keyboard cat', // <-- missing comma here
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }))
  //catch and forward to error handler
  .use(function (req, res, next) {
    next(createError(404));
  })
  .listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}/`);
  });

  export { app };
