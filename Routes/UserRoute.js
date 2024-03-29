const express = require("express");
const { getAllUser, createUser, loginUser, editUser, getUserById } = require("../Controllers/UserController");

const UserRouter = express.Router();

UserRouter.get("/", getAllUser);
UserRouter.post("/", createUser);
UserRouter.post("/login", loginUser);

UserRouter.get("/:id", getUserById);
UserRouter.post("/:id", editUser);

module.exports = UserRouter;