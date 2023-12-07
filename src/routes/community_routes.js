import express from "express";
import "dotenv/config.js";

import { find, findone, create } from "../controllers/community_controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIN.js";
import { trimMiddleware } from "../middlewares/trimMiddleware.js";
import { bufferToBase64 } from "../middlewares/bufferToBase64.js";

const sendResponse = (req, res) => {
  res.json(res.locals.data);
};


const community = express.Router();

community.use(express.urlencoded({ extended: true }));

community.get("/", find, bufferToBase64, sendResponse);

community.get("/form", isLoggedIn, async (req, res) => {
  res.render("form");
});

community.get("/:id", findone);

community.post("/", isLoggedIn, trimMiddleware, create, async (req, res) => {
  
  return res.redirect("/community");
});

community.delete("/:id");

// community.put("/");

export { community };
