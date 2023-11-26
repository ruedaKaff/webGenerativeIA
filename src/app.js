import "dotenv/config.js";

import express, { json } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { login } from "./routes/auth_route.js";
import { community } from "./routes/community_routes.js";
import { generative } from "./routes/generative_routes.js";
import {image_processing} from "./routes/img_routes.js"
import { nlp } from "./routes/nlp_routes.js";
import session from "express-session";


import passport from "passport";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(cors())
  .use(json())
  .use(
    session({
      secret: "mySecret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
      },
    })
  )
  .use(passport.session())
  .use(passport.initialize())
  // .use(passport.authenticate("session"))
  .use("/generative", generative)
  .use("/nlp", nlp)
  .use("/img_processing", image_processing)
  // .use("/llm", chat)
  .use("/community", community)
  .use("/login", login)
  
  .use(express.static(path.join(__dirname, "utilities")))

  //catch and forward to error handler
  // .use(function (req, res, next) {
  //   next(createError(404));
  // })
  .listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}/`);
  });

export { app };
