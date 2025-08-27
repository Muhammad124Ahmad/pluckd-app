/*jshint esversion: 8 */
const express = require("express");
const multer = require("multer");
const connectToDatabase = require("../models/db");
const logger = require("../logger");
const { ObjectId } = require("mongodb");

const router = express.Router();

// use memory storage instead of disk
const upload = multer({ storage: multer.memoryStorage() });

// Fetch all gifts
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gifts = await collection.find({}).toArray();

    res.json(gifts);
  } catch (e) {
    logger.error("Error fetching gifts:", e);
    res.status(500).json({ error: "Internal error - fetching gifts" });
  }
});

// Serve gift image
router.get("/image/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    const id = req.params.id;
    const gift = await collection.findOne({ _id: new ObjectId(id) });

    if (!gift || !gift.image || !gift.image.data) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", gift.image.contentType);
    res.send(gift.image.data.buffer); // <-- send binary data
  } catch (e) {
    console.error("Error fetching image:", e);
    res.status(500).json({ error: "Internal error - fetching image" });
  }
});

// Fetch gift by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const id = req.params.id;

    const gift = await collection.findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).send("Gift not found");
    }

    res.json(gift);
  } catch (e) {
    res.status(500).json({ error: "Internal error - fetching gift by id" });
  }
});

// Add a new gift
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    const { userName, name, category, condition, age, description } = req.body;

    const fileData = req.file ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    const gift = await collection.insertOne({
      name,
      category,
      condition,
      date_added: new Date().toDateString(),
      age_years: age,
      description,
      image: fileData,
      userName,
    });

    res.status(201).json({
      message: "Gift created successfully",
      id: gift.insertedId,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal error - product addition" });
  }
});

// Delete gift
router.delete("/delete/:productId", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const productId = req.params.productId;

    const result = await collection.findOneAndDelete({
      _id: new ObjectId(productId),
    });

    if (!result) {
      logger.error("Product not found-for deletion");
      return res
        .status(404)
        .json({ message: "Product not found-for deletion" });
    }

    logger.info("Successfully deleted - product");
    return res.status(200).json({ message: "Successfully deleted - product" });
  } catch (error) {
    res.status(500).json({ error: "Internal error - product deletion" });
  }
});

module.exports = router;
