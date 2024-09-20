const { Router } = require("express");
const namesRouter = Router();
const namesController = require("../controllers/namesController");

namesRouter.get("/", namesController.playerNamesGet);
namesRouter.get("/add", namesController.addPlayerGet);
namesRouter.post("/add", namesController.addPlayerPost);
namesRouter.get("/delete", namesController.deleteAll);

module.exports = namesRouter;
