import { Router } from "express";
import "dotenv/config.js"

// import { } from "../controllers/feed_controller.js";
// import { trimMiddleware } from "../common/trimMiddelware.js";
const community = Router();

community.get(
    "/", ()=>{console.log("youre in community");}
   
);

community.get(
    "/",
   
)

community.put(
    "/"
    
);
  

community.post(
    "/",
    
);

community.delete(
    "/:documento",
);

export {
    community
}