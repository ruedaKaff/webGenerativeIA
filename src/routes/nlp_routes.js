import { Router } from "express";
import "dotenv/config.js";

import { summarize, entity } from "../services/NLP_service.js";
import { create} from "../controllers/community_controller.js";
//NLP services
const nlp = Router();

nlp.post("/summarize", summarize);
nlp.post("/entity", entity);
nlp.post("/",create)

export { nlp };
