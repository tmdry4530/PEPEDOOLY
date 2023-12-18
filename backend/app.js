const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/index");
const cookieParser = require("cookie-parser");
const { adminAuth } = require("./src/lib/jwtAuthMiddleware");

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    method: "GET,POST,OPTIONS,PUT,DELETE,UPDATE",
    credentials: true,
  })
);
app.use(adminAuth);
app.use(router);

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = app;
