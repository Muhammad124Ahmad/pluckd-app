const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const connectToDatabase = require("../models/db");
const router = express.Router();
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");
    const email = req.body.email;
    const existingUser = await collection.findOne({ email });
    if (!existingUser) {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);

      const newUser = await collection.insertOne({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        createdAt: new Date(),
      });

      const payload = {
        user: {
          id: newUser.insertedId,
        },
      };

      const authToken = jwt.sign(payload, JWT_SECRET);

      return res.json({ authToken, email });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports=router

