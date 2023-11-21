import axios from 'axios';
import { response } from 'express'; // Assuming 'response' is imported from 'express'
import 'dotenv/config.js';

const hfApiKey = process.env.HF_API_KEY;
const endpointUrl = process.env.HF_API_SUMMARY_BASE;
console.log(process.env.HF_API_SUMMARY_BASE);
const summarize = async (req, res = response) => {
  console.log("Testing nlp");
  try {
    const prompt = req.body.prompt;
    const axiosConfig = {
      headers: { Authorization: `Bearer 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` },
    };

    const axiosData = {
      inputs: prompt,
      // Add parameters if needed
    };

    const axiosResponse = await axios.post("https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6", axiosData, axiosConfig);
    console.log('helllo below i should response');

    if (axiosResponse.data[0].summary_text) {
      const summarizedText = axiosResponse.data[0].summary_text;
      console.log(summarizedText);
      res.json({ summary: summarizedText });
    } else {
      res.status(500).json({ error: "Summarization failed" });
    }
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ error: "Summarization failed" });
  }
};

const entity = async (req, res = response) => {
  // "NLP-entity recognition service here"
  console.log("Testing nlp2");
  try {
    const prompt = req.body.prompt;

    response = await axios.post("URL_API", {
      prompt: prompt,
      // Add paramaters
    });

    if (response.data && response.data.summary) {
      const summarizedText = response.data.summary;
      res.json({ summary: summarizedText });
    } else {
      res.status(500).json({ error: "recognition failed" });
    }
  } catch (error) {
    console.error("recognition error:");
    res.status(500).json({ error: "recognition failed" });
  }
};

export { summarize, entity };