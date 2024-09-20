const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 30 characters.";

const validatePlayer = [
  body("playerName")
    .trim()
    .isAlpha()
    .withMessage(`Player name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Player name ${lengthErr}`),
];

exports.playerNamesGet = async (req, res) => {
  const search = req.query.search || "";
  let playerNames;

  if (search) {
    playerNames = await db.searchPlayers(search);
  } else {
    playerNames = await db.getAllPlayers();
  }

  console.log("PlayerNames: ", playerNames);
  res.render("players", {
    title: "Player List",
    players: playerNames.map((player) => player.player_name),
  });
};

exports.addPlayerGet = (req, res) => {
  res.render("addPlayer", {
    title: "Add Player",
  });
};

exports.addPlayerPost = [
  validatePlayer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addPlayer", {
        title: "Add Player",
        errors: errors.array(),
      });
    }

    const { playerName, playerPosition, playerTeam } = req.body;
    await db.insertPlayer(playerName, playerPosition, playerTeam);
    res.redirect("/names");
  },
];

// Handle the GET request to delete all players
exports.deleteAll = async (req, res) => {
  await db.deleteAllPlayers();
  res.redirect("/");
};
