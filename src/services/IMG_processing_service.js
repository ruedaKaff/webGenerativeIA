import axios from "axios";
// import fs from "fs/promises";
import { response } from "express"; // Assuming 'response' is imported from 'express'
import "dotenv/config.js";

const hfApiKey = process.env.HF_API_KEY;
const endpointICAP = process.env.HF_API_ICAPTION_BASE;
const endpointSDIF = process.env.HF_API_SDIFFUSION_BASE;

const captioning = async (req, res = response) => {
  console.log("Testing captioning");
  try {
    const base64Image = req.file.buffer.toString("base64");

    const axiosConfig = {
      headers: { Authorization: `Bearer ${hfApiKey}` },
    };

    const axiosData = {
      inputs: base64Image,
      // Add parameters if needed
    };

    const axiosResponse = await axios.post(
      endpointICAP,
      axiosData,
      axiosConfig
    );
    // console.log(axiosResponse);
    if (axiosResponse.data && axiosResponse.data.length > 0) {
      const generated_text = axiosResponse.data[0].generated_text;
      res.json({ generated_text });
    } else {
      res.status(500).json({ error: "Image Captioning failed" });
    }
  } catch (error) {
    console.error("Image Captioning error:", error.data);
    res.status(500).json({ error: "Image Captioning failed" });
  }
};

const generator = async (req, res, next) => {
  console.log("testing generator");
  try {
    const { prompt, negativePrompt, steps, guidance, width, height } = req.body;

    const params = {
      negative_prompt: negativePrompt,
      num_inference_steps: steps,
      guidance_scale: guidance,
      width: width,
      height: height,
    };
    console.log(prompt);
    console.log("params:", params);
    const uniquePrompt = `${prompt}_${Math.floor(Date.now() / 1000)}`;
    const output = await imgGEN(uniquePrompt, params);

    if (output) {
       res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on the image format
       res.setHeader('Content-Disposition', 'inline; filename=image.jpg'); // Specify the filename

      // Send the binary data as the response
      
      res.locals.data = output;
      
    } else {
      return null; // Handle case where output is null
    }
  } catch (error) {
    console.error("Error in generator:");
    return null;
  }
  next();
};

const imgGEN = async (
  inputs,
  parameters = null,
  ENDPOINT_URL = endpointSDIF
) => {
 

  try {
    const headers = {
      Authorization: `Bearer ${hfApiKey}`,
      "Content-Type": "application/json",
    };

    const data = { inputs: inputs };

    if (parameters) {
      data.parameters = parameters;
    }

    const response = await axios.post(ENDPOINT_URL, data, { headers, responseType: 'arraybuffer' });

    if (response.status === 200) {
      // Convert the binary data to a Buffer
      const buffer = Buffer.from(response.data);

      // Save the Buffer to a file (adjust the filename and path as needed)
      return buffer;
    } else {
      return null; // Handle error cases appropriately
    }
  } catch (error) {
    console.error("Error in getCompletion:");
    return null;
  }
};

export { captioning, generator };
