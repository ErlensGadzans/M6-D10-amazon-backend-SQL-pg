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

router.get("/", async (req, res, next) => {
  try {
    const response = await products.findOne();
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = products.findByIdAndDelete(req.params.id);
    res.send(productToDelete);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = products.findByIdAndUpdate(req.params.id, req.body);
    res.send(productToUpdate);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
