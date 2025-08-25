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
    next(e);
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
    next(e);
  }
});

// Add a new gift
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    const {name, category, condition,age, description } = req.body;

    // multer puts the uploaded file info in req.file
    const imagePath = req.file ? req.file.path : null;

    const gift = await collection.insertOne({
      name,
      category,
      condition,
      date_added:new Date().toDateString(),
      age_years:age,
      description,
      image: imagePath, // store path like "uploads/1692982721234-chair.png"
    });

    res
      .status(201)
      .location(`/gifts/${gift.insertedId}`)
      .json({
        _id: gift.insertedId,
        category,
        condition,
        age,
        description,
        image: imagePath,
      });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
