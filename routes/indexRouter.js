const { Router } = require("express");
const indexRouter = Router();

const namesRouter = require("./namesRouter");
// const teamsRouter = require("./teamsRouter");
// const positionsRouter = require("./positionsRouter");

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Use the specific routers for each entity
indexRouter.use("/names", namesRouter);
// indexRouter.use("/teams", teamsRouter);
// indexRouter.use("/positions", positionsRouter);

module.exports = indexRouter;
