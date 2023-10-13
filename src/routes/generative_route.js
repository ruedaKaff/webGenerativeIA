import { Router } from "express";
import "dotenv/config.js"

// import { } from "../controllers/feed_controller.js";
// import { trimMiddleware } from "../common/trimMiddelware.js";
const generative = Router();

generative.get(
    "/", ()=>{console.log("youre in home");}
   
);

generative.get(
    "/",
   
)

generative.put(
    "/"
    
);
  

generative.post(
    "/",
    
);

generative.delete(
    "/:documento",
);

export {
    generative
}