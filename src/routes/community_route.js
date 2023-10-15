import { Router } from "express";
import "dotenv/config.js";

import { find, findone } from "../controllers/community_controller.js";
// import { trimMiddleware } from "../common/trimMiddelware.js";
const community = Router();

community.get("/", find);

community.get("/:id", findone);

community.put("/");

community.post("/");

community.delete("/:id");

export { community };