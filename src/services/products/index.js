const express = require("express");
const router = express.Router();
const db = require("../../db");

const Model = require("../../model");

const products = new Model("products");

router.post("/", async (req, res, next) => {
  try {
    const response = await products.save(req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
