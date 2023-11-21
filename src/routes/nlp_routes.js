import { Router } from "express";
import "dotenv/config.js";

import { summarize, entity } from "../services/NLP_service.js";
import { create } from "../controllers/community_controller.js";
//NLP services
const nlp = Router();

nlp.post("/summarize", summarize);
nlp.post("/entity", entity);
nlp.post("/",create)

export { nlp };
// async function getCompletion(inputs, parameters = null) {
//     const headers = {
//       'Authorization': `Bearer ${hfApiKey}`,
//       'Content-Type': 'application/json',
//     };
  
//     const data = { inputs };
  
//     if (parameters !== null) {
//       data.parameters = parameters;
//     }
  
//     try {
//       const response = await axios.post(endpointUrl, data, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error in getCompletion:', error.message);
//       throw error;
//     }
//   }
  
//   async function summarize(input) {
//     const output = await getCompletion(input);
//     return output[0]['summary_text'];
//   }
  