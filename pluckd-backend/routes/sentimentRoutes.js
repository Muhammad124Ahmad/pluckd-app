const logger = require("../logger");
const express = require("express");

// Task 1: import the natural library
const natural = require("natural");

// Task 2: initialize the express server
const router = express.Router();


router.post("/", async (req, res) => {
  const { sentence } = req.body;

  if (!sentence) {
    logger.error("No sentence provided");
    return res.status(400).json({ error: "No sentence provided" });
  }

  // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
  const Analyzer = natural.SentimentAnalyzer;
  const stemmer = natural.PorterStemmer;
  const analyzer = new Analyzer("English", stemmer, "afinn");

  // Perform sentiment analysis
  try {
    const analysisResult = analyzer.getSentiment(sentence.split(" "));

    let sentiment = "neutral";

    if (analysisResult < 0) {
      sentiment = "negative";
    } else if (analysisResult >= 0 && analysisResult <= 0.33) {
      sentiment = "neutral";
    } else {
      sentiment = "positive";
    }

    // Logging the result
    logger.info(`Sentiment analysis result: ${analysisResult}`);

    res
      .status(200)
      .json({ sentimentScore: analysisResult, sentiment: sentiment });
  } catch (error) {
    logger.error(`Error performing sentiment analysis: ${error}`);
    res.status(500).json({ message: "Error performing sentiment analysis" });
  }
});

module.exports = router;
