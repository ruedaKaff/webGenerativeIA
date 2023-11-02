import express, { json } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { generative } from "./routes/generative_routes.js";
import { community } from "./routes/community_routes.js";
import { nlp } from "./routes/nlp_routes.js";
import { login } from "./routes/auth_route.js";
import "dotenv/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app
  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(cors())
  .use(json())
  .use("/generative", generative)
  .use("/nlp", nlp)
  // .use("/img-procesing", image-procesing)
  // .use("/llm", chat)
  .use("/community",community)
  .use("/login",login)
  .use(express.static(path.join(__dirname, 'utilities')))
  .listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}/`);
  });

export { app };
