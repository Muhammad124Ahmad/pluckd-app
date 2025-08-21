const logger = require("../logger");
const connectToDatabase = require("../models/db");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("gifts");

    const gifts = await collection.find({}).toArray();

    res.json(gifts);
  } catch (e) {
    logger.error("Error fetching gifts:", e);
    next(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("gifts");

    const id = req.params.id;

    const gift = await collection.findOne({ id: id });

    if (!gift) {
      return res.status(404).send("Gift not found");
    }

    res.json(gift);
  } catch (e) {
    next(e);
  }
});

// Add a new gift
router.post("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gift = await collection.insertOne(req.body);

    res
      .status(201)
      .location(`/gifts/${gift.insertedId}`)
      .json({ _id: gift.insertedId, ...req.body });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
