import express from "express";
import "dotenv/config.js";

import { find, findone, create } from "../controllers/community_controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIN.js";




const community = express.Router();

community.use(express.urlencoded({ extended: true }));

community.get("/", find );
// community.get("/form", isLoggedIn, async (req, res) => {
//   res.render("form");
// });

community.get("/:id", findone);

community.post("/", isLoggedIn, create, async (req, res) => {
  return res.json({ message: 'Community created successfully' });
});
community.delete("/:id");

// community.put("/");

export { community };
