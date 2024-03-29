const express = require("express");
const { getHomesForSale, createHomesForSale, getSaleHomeById, deleteSaleHomeById, approvedSaleHomes } = require("../Controllers/HomeForSaleController");
const { upload } = require("../Multer/Multer");

const HomeForSaleRouter = express.Router();

HomeForSaleRouter.post("/create", upload.fields([ { name: 'images' }, { name: "video" } ]), createHomesForSale);

HomeForSaleRouter.get("/", getHomesForSale);
HomeForSaleRouter.get("/approved", approvedSaleHomes);

HomeForSaleRouter.get("/:id", getSaleHomeById);
HomeForSaleRouter.delete("/:id", deleteSaleHomeById);

module.exports = HomeForSaleRouter;