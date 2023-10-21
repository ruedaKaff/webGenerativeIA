import  axios  from "axios";


const summarize = async (req, res = response) => {
  // "NLP-sumarize service here"
    console.log("Testing nlp");
  try {
    const prompt = req.body.prompt;

    reponse = await axios.post("URL_API", {
      prompt: prompt,
      // Add paramaters
    });

    if (response.data && response.data.summary) {
      const summarizedText = response.data.summary;
      res.json({ summary: summarizedText });
    } else {
      res.status(500).json({ error: "Summarization failed" });
    }
  } catch (error) {
    console.error("Summarization error:");
    res.status(500).json({ error: "Summarization failed" });
  }
};

const entity = async (req, res = response) => {
  // "NLP-entity recognition service here"
  console.log("Testing nlp2");
  try {
    const prompt = req.body.prompt;

    reponse = await axios.post("URL_API", {
      prompt: prompt,
      // Add paramaters
    });

    if (response.data && response.data.summary) {
      const summarizedText = response.data.summary;
      res.json({ summary: summarizedText });
    } else {
      res.status(500).json({ error: "Summarization failed" });
    }
  } catch (error) {
    console.error("Summarization error:");
    res.status(500).json({ error: "Summarization failed" });
  }
};

export { summarize, entity };