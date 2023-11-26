import { Router } from "express";
import "dotenv/config.js";

//generative sections crud
import { find, findone } from "../controllers/generative_controller.js";

// import { trimMiddleware } from "../common/trimMiddelware.js";

const generative = Router();

generative.get("/", find);

generative.get("/:id", findone);
// generative.get("/:id", findone);
// generative.get("/", findone);

generative.delete("/:id");

export { generative };
