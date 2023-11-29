import { Router } from "express";
import "dotenv/config.js";

import { summarize, entity } from "../services/NLP_service.js";
import { create } from "../controllers/community_controller.js";
import { trimMiddleware } from "../middlewares/trimMiddleware.js";
//NLP services

const nlp = Router();

nlp.post("/summarize", trimMiddleware, summarize);
nlp.post("/entity",trimMiddleware, entity);
// nlp.post("/", create);

export { nlp };
