import express, { json } from "express";
import cors from "cors";
import { generative } from "./routes/generative_route.js"
import { community } from "./routes/community_route.js"
import "dotenv/config.js";

const app = express();

app
  .use(cors())
  .use(json())
  .use("/home", generative)
  .use("/community",community)
  .listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}/`);
  });

export { app };
