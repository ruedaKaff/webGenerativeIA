import "dotenv/config.js";

import express, { json } from "express";
import cors from "cors";
import { login } from "./routes/auth_route.js";
import { community } from "./routes/community_routes.js";
import { generative } from "./routes/generative_routes.js";
import { image_processing } from "./routes/img_routes.js";
import { nlp } from "./routes/nlp_routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";

import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";

const home = (req, res) => {
  res.send("welcome webGIA");
};

const app = express();

app
  .set("view engine", "ejs")
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(json())
  .use(cookieParser())
  .use(sessionMiddleware)

  .use("/login", login)
  .use(passport.initialize())
  .use(passport.session())

  .use("/generative", generative)
  .use("/nlp", nlp)
  .use("/img_processing", image_processing)
  // .use("/llm", chat)
  .use("/community", community)
  .use("/", home)

  .listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}/`);
  });
  app.timeout = 60000;

export { app };
