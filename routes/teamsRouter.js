const { Router } = require("express");
const teamsRouter = Router();
const teamsController = require("../controllers/teamsController");

teamsRouter.get("/", teamsController);

module.exports = teamsRouter;
