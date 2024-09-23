const { Router } = require("express");
const namesRouter = Router();
const namesController = require("../controllers/namesController");

namesRouter.get("/", namesController.playerNamesGet);
namesRouter.get("/add", namesController.addPlayerGet);
namesRouter.post("/add", namesController.addPlayerPost);
namesRouter.get("/delete", namesController.deleteAll);
namesRouter.get("/view/:id", namesController.viewPlayer);
namesRouter.post("/deleteSelected", namesController.deleteSelectedPlayers);
namesRouter.get("/update/:id", namesController.getPlayerUpdate);
namesRouter.post("/update/:id", namesController.updatePlayerPost);

module.exports = namesRouter;
