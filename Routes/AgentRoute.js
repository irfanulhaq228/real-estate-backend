const express = require("express");
const { getAgents, createAgent, loginAgent, getAgentById } = require("../Controllers/AgentController");

const AgentRouter = express.Router();

AgentRouter.get("/", getAgents);
AgentRouter.post("/", createAgent);
AgentRouter.post("/login", loginAgent);
AgentRouter.get("/:id", getAgentById);

module.exports = AgentRouter;