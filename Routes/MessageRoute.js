const express = require("express");
const { getAllMessages, createMessage, getUsersFromAgent, getUserMessages } = require("../Controllers/MessageController");

const MessageRouter = express.Router();

MessageRouter.get("/", getAllMessages);
MessageRouter.post("/", createMessage);

MessageRouter.post("/agent/:id", getUsersFromAgent);
MessageRouter.post("/user/:id", getUserMessages);

module.exports = MessageRouter;