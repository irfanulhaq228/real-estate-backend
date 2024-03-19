const express = require("express");
const { getHomesForSale, createHomesForSale, getSaleHomeById, deleteSaleHomeById } = require("../Controllers/HomeForSaleController");
const { upload } = require("../Multer/Multer");

const HomeForSaleRouter = express.Router();

HomeForSaleRouter.get("/", getHomesForSale);
HomeForSaleRouter.post("/create", upload.fields([ { name: 'images' }, { name: "video" } ]), createHomesForSale);
HomeForSaleRouter.get("/:id", getSaleHomeById);
HomeForSaleRouter.delete("/:id", deleteSaleHomeById);

module.exports = HomeForSaleRouter;