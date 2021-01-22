const express = require("express");
const router = express.Router();
const db = require("../../db");
const reviews = require("../../db").reviews;

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

router.get("/withReviews", async (req, res, next) => {
  try {
    // find articles joined with authors and categories
    const query = `SELECT p.name,p.description, p.brand, p.price, p.category, r.comment, r.rate FROM products AS p INNER JOIN reviews AS r ON r.productid=p.id;`;

    const productsWithReviews = await db.query(query);
    res.send(productsWithReviews.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  try {
    // find articles joined with authors and categories
    const singleProduct = await products.findOne(req.params.id);
    const query = `SELECT p.name,p.description, p.brand, p.price, p.category, r.comment, r.rate FROM products AS p INNER JOIN reviews AS r ON r.productid=p.id;`;
    const productsWithReviews = await db.query(query);
    res.send(productsWithReviews.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
