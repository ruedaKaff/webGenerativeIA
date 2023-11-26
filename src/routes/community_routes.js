import { Router } from "express";
import "dotenv/config.js";

import { find, findone, create } from "../controllers/community_controller.js"; 
import { checkLogged, isLoggedIn  } from "../middlewares/isLoggedIN.js";
// import { find, findone } from "../controllers/community_controller.js";   need to import for the services needed to this enpoint fully works
// import { trimMiddleware } from "../common/trimMiddelware.js";

const community = Router();

community.get("/", find);

community.get("/:id", findone);

community.put("/");

community.post("/",isLoggedIn , async(req, res)=>{
    
    create
    console.log("puede postear");
    res.send("Is logged")

}); 

community.delete("/:id");

export { community };
