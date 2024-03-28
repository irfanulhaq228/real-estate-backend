const express = require("express");
const { getAllUser, createUser, loginUser } = require("../Controllers/UserController");

const UserRouter = express.Router();

UserRouter.get("/", getAllUser);
UserRouter.post("/", createUser);
UserRouter.post("/login", loginUser);

module.exports = UserRouter;