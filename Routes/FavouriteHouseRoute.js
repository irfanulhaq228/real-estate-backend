const express = require("express");
const { getAllUsersFavouriteHouse, createUserFavouriteHouse, getUserFavouriteHouse } = require("../Controllers/FovouriteHouseController");

const FavouriteHouseRouter = express.Router();

FavouriteHouseRouter.post("/", createUserFavouriteHouse);
FavouriteHouseRouter.get("/", getAllUsersFavouriteHouse);
FavouriteHouseRouter.get("/:id", getUserFavouriteHouse);

module.exports = FavouriteHouseRouter;