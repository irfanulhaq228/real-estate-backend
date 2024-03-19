const express = require("express");
const { getHomesForRent, createHomesForRent, getRentalHomeById, deleteRentalHomeById } = require("../Controllers/HomeForRentController");
const { upload } = require("../Multer/Multer");

const HomeForRentRouter = express.Router();

HomeForRentRouter.get("/", getHomesForRent);
HomeForRentRouter.post("/create", upload.fields([ { name: 'images' }, { name: "video" } ]), createHomesForRent);
HomeForRentRouter.get("/:id", getRentalHomeById);
HomeForRentRouter.delete("/:id", deleteRentalHomeById);

module.exports = HomeForRentRouter;