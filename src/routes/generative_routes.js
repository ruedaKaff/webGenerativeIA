import { Router } from "express";
import "dotenv/config.js";


//generative sections crud
import { find, findone } from "../controllers/generative_controller.js";
//services
import {summarize, entity} from "../services/NLP_service.js"
// import { trimMiddleware } from "../common/trimMiddelware.js";
const generative = Router();

generative.get("/", find);

generative.get("/:id", findone);
generative.get("/:id", findone);
generative.get("/", findone);


//NLP services
generative.post("/nlp/summarize",summarize);
generative.post("/nlp/entity",entity);

generative.delete("/:id");

export { generative };
