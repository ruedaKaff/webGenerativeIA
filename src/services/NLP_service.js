import axios from "axios";
import { response } from "express"; // Assuming 'response' is imported from 'express'
import "dotenv/config.js";

const hfApiKey = process.env.HF_API_KEY;
const endpointSum = process.env.HF_API_SUMMARY_BASE;
const endpointNER = process.env.HF_API_NER_BASE;

const summarize = async (req, res = response) => {
  console.log("Testing nlp");
  try {
    const prompt = req.body.prompt;
    const axiosConfig = {
      headers: { Authorization: `Bearer ${hfApiKey}` },
    };

    const axiosData = {
      inputs: prompt,
      // Add parameters if needed
    };

    const axiosResponse = await axios.post(endpointSum, axiosData, axiosConfig);
    console.log("helllo below i should response:");

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

// NLP-Entity recognition service here.
function formatEntities(response) {
  const { text, entities } = response;

  if (!text || !entities || entities.length === 0) {
    return text; // No entities or text provided
  }

  let formattedText = text;

  // Sort entities by start index in descending order
  entities.sort((a, b) => b.start - a.start);

  // Replace each entity with [entityType]
  for (const entity of entities) {
    const { start, end, entity: entityType } = entity;
    const entityText = text.substring(start, end);
    const replacement = `[${entityText}:${entityType}]`;
    formattedText =
      formattedText.slice(0, start) + replacement + formattedText.slice(end);
  }

  return formattedText;
}

function mergeTokens(tokens) {
  const mergedTokens = [];
  for (const token of tokens) {
    if (
      mergedTokens.length > 0 &&
      token.entity_group.startsWith("I-") &&
      mergedTokens[mergedTokens.length - 1].entity_group ===
        "B-" + token.entity_group.slice(2)
    ) {
      // If current token continues the entity of the last one, merge them
      const lastToken = mergedTokens[mergedTokens.length - 1];
      lastToken.word += token.word.replace("##", "");
      lastToken.end = token.end;
      lastToken.score = (lastToken.score + token.score) / 2;
    } else {
      mergedTokens.push(token);
    }
  }
  return mergedTokens;
}

const entity = async (req, res = response) => {
  // "NLP-entity recognition service here"
  console.log("Testing nlp2");
  try {
    const input = req.body.prompt;
    const axiosConfig = {
      headers: { Authorization: `Bearer ${hfApiKey}` },
    };

    const axiosData = {
      inputs: input,
      // Add parameters if needed
    };

    const axiosResponse = await axios.post(endpointNER, axiosData, axiosConfig);

    if (axiosResponse.data && axiosResponse.data.length > 0) {
      const mergedTokens = mergeTokens(axiosResponse.data);
      const entities = mergedTokens.map((token) => ({
        start: token.start,
        end: token.end,
        entity: token.entity_group,
      }));

      // Create an object for better clarity
      const formattedResponse = { text: input, entities: entities };

      // Send the formatted response
      res.json({ text: formatEntities(formattedResponse) });
    } else {
      res.status(500).json({ error: 'Named Entity Recognition failed - No data received' });
    }
  } catch (error) {
    console.error('Named Entity Recognition error:', error);
    res.status(500).json({ error: 'Named Entity Recognition failed - Internal server error' });
  }
};


export { summarize, entity };
