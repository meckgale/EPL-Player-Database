const { Router } = require("express");
const positionsRouter = Router();
const positionsController = require("../controllers/positionsController");

positionsRouter.get("/", positionsController);

module.exports = positionsRouter;
