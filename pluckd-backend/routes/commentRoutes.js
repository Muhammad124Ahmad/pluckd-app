const logger = require("../logger");
const connectToDatabase = require("../models/db");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ObjectId, ReturnDocument } = require("mongodb");

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

router.delete("/delete/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const db = await connectToDatabase();
    const collection = db.collection("comments");
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(commentId),
    });
    if (!result.value) {
      logger.error("Comment not found");
      return res.status(404).json({ error: "Comment not found" });
    }

    logger.info("Successfully Deleted");
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    logger.error("Internal Error");
    return res.status(500).json({ error: "Something Went wrong" });
  }
});

// router.put("/update/:commentId", async (req, res) => {
//   try {
//     const commentId = new ObjectId(req.params.commentId);
//     const db = await connectToDatabase();
//     const collection = db.collection("comments");
//     const result = await collection.findOneAndUpdate(
//       { _id: commentId },
//       { $set: { comment: req.body.comment } },
//       { returnDocument: "after" }
//     );
//     if (!result) {
//       logger.error("Comment does not exist");
//       res.status(404).json({ error: "Comment not found" });
//     }

//     logger.info("Successfully Updated");
//     res.status(200).json("Successfully updated");
//   } catch (error) {
//     logger.error("Something went wrong");
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

module.exports = router;
