const express = require("express");
const multer = require("multer");
const path = require("path");
const connectToDatabase = require("../models/db");
const logger = require("../logger");
const { ObjectId } = require("mongodb");

const router = express.Router();

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save inside backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("gifts");

    const gifts = await collection.find({}).toArray();

    res.json(gifts);
  } catch (e) {
    logger.error("Error fetching gifts:", e);
    res.status(500).json({ error: "Internal error - fetching gift" });
  }
});

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
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    const { userName, name, category, condition, age, description } = req.body;

    // multer puts the uploaded file info in req.file
    const imagePath = req.file ? req.file.path : null;

    const gift = await collection.insertOne({
      name,
      category,
      condition,
      date_added: new Date().toDateString(),
      age_years: age,
      description,
      image: imagePath, // store path like "uploads/1692982721234-chair.png"
      userName,
    });

    res.status(201).json({
      message: "Gift created successfully",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal error - product addition" });
  }
});

router.delete("/delete/:productId", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const productId = req.params.productId;
    const result = await collection.findOneAndDelete({ _id: new ObjectId(productId) });

    if (!result) {
      logger.error("Product not found-for deletion");
      return res
        .status(404)
        .json({ message: "Product not found-for deletion" });
    }

    logger.info("Succesfully deleted - product");
    return res.status(200).json({ message: "Succesfully deleted-product" });
  } catch (error) {
    res.status(500).json({ error: "Internal error - product deletion" });
  }
});

module.exports = router;
