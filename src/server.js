require("dotenv").config();

const { SERVER_PORT } = process.env;

const express = require("express");
const { connectToDB } = require("./config");

const { NOT_FOUND } = require("http-status");
const router = require("./router");

const app = express();

connectToDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api", router);

app.listen(SERVER_PORT, () =>
  console.log(`Server started on port ${SERVER_PORT}`)
);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "endpoint not found !" });
});
