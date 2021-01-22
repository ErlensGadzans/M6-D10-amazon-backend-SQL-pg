const express = require("express");
require("dotenv").config();
const cors = require("cors");
const productsRouter = require("./services/products");
const reviewsRouter = require("./services/reviews");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

server.get("/", (req, res, next) => {
  res.send("Server is running!");
});

const port = process.env.PORT || 3077;

server.listen(port, () => {
  console.log("This server is running on port:" + port);
});
