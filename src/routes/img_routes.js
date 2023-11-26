import { Router } from "express";

import "dotenv/config.js"
import { create } from "../controllers/community_controller.js";
import { captioning, generator } from "../services/IMG_processing_service.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const image_processing = Router();

image_processing.post("/caption",upload.single('image'),captioning)
image_processing.post("/generator", generator)
image_processing.post("/", create)


export {image_processing}