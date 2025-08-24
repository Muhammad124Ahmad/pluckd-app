const logger = require("../logger");
const connectToDatabase = require("../models/db");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("comments");
    const comments = await collection.find({}).toArray();

    res.status(200).json(comments);
  } catch (error) {
    logger.error("Error", error);
    res.status(500).json({ error: error });
  }
});

router.post(
  "/",
  [body("userName").notEmpty(), body("comment").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Invalid comment");
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const { userName, comment } = req.body;
      const db = await connectToDatabase();
      const comments = db.collection("comments");
      await comments.insertOne({ userName, comment });
      res.status(200).json({ message: "Success" });
    } catch (error) {
      logger.error("error");
      res.status(500).json({ error: error });
    }
  }
);

module.exports = router;
