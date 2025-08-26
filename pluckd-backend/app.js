/*jshint esversion: 8 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pinoLogger = require("./logger");
const giftroutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const connectToDatabase = require("./models/db");
const sentimentRoutes = require("./routes/sentimentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3060;
app.use("/uploads", express.static("uploads"));

//adding gift route
app.use("/api/gifts", giftroutes);

//adding search routes
app.use("/api/search", searchRoutes);

//adding auth endpoint
app.use("/api/auth", authRoutes);

//adding comment endpoint
app.use("/api/comment", commentRoutes);

//adding sentiment route
app.use("/api/sentiment", sentimentRoutes);

// Connect to MongoDB; we just do this one time
connectToDatabase()
  .then(() => {
    pinoLogger.info("Connected to DB");
  })
  .catch((e) => console.error("Failed to connect to DB", e));

app.use(express.json());

const pinoHttp = require("pino-http");
const logger = require("./logger");

app.use(pinoHttp({ logger }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.get("/", (req, res) => {
  res.send("Inside the server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
