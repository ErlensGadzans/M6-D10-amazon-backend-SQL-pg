const express = require("express");
require("dotenv").config();

const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res, next) => {
  res.send("Server is running!");
});

const port = process.env.PORT || 3077;

server.listen(port, () => {
  console.log("This server is running on port:" + port);
});
