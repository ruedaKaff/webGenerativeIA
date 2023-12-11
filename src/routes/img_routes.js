import { Router } from "express";

import "dotenv/config.js";
import { create } from "../controllers/community_controller.js";
import { captioning, generator } from "../services/IMG_processing_service.js";
import { trimMiddleware } from "../middlewares/trimMiddleware.js";
import multer from "multer";
import { bufferToBase64, generatedToBase64 } from "../middlewares/bufferToBase64.js";

const sendResponse = (req, res) => {
    res.json(res.locals.data);
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const image_processing = Router();

image_processing.post("/caption", upload.single("image"), captioning);
image_processing.post("/generator", generator, generatedToBase64, sendResponse);
image_processing.post("/",trimMiddleware, create);

export { image_processing };
