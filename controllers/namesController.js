const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const matchesErr = "must only contain letters.";
const lengthErr = "must be between 1 and 30 characters.";

const validatePlayer = [
  body("playerName")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(`Player name ${matchesErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Player name ${lengthErr}`),
];

exports.playerNamesGet = async (req, res) => {
  const { search, team, position } = req.query;

  try {
    const players = await db.searchPlayers(search, team, position);
    res.render("players", { title: "Player List", players });
  } catch (err) {
    console.error("Error searching players:", err);
    res.status(500).send("Database error");
  }
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

exports.viewPlayer = async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await db.getPlayerById(playerId);
    res.render("viewPlayer", { title: "Player Details", player });
  } catch (err) {
    console.error("Error fetching player details:", err);
    res.status(500).send("Database error");
  }
};

exports.getPlayerUpdate = async (req, res) => {
  const playerId = req.params.id;

  try {
    const player = await db.getPlayerById(playerId); // Assuming getPlayerById is a function in db/queries.js
    console.log("Player fetched for update:", player);
    res.render("updatePlayer", { player });
  } catch (err) {
    console.error("Error fetching player for update:", err);
    res.status(500).send("Error loading player details");
  }
};

exports.updatePlayerPost = async (req, res) => {
  const { playerName, playerPosition, playerTeam } = req.body;
  const playerId = req.params.id;

  try {
    await db.updatePlayer(playerId, playerName, playerPosition, playerTeam); // Assuming updatePlayer is a function in db/queries.js
    res.redirect("/names"); // Redirect to the player detail page after update
  } catch (err) {
    console.error("Error updating player:", err);
    res.status(500).send("Error updating player");
  }
};

exports.deleteSelectedPlayers = async (req, res) => {
  const selectedPlayerIds = req.body.selectedPlayers;

  try {
    if (Array.isArray(selectedPlayerIds)) {
      await db.deletePlayersByIds(selectedPlayerIds);
    } else if (selectedPlayerIds) {
      await db.deletePlayersByIds([selectedPlayerIds]);
    }
    res.redirect("/names");
  } catch (err) {
    console.error("Error deleting players:", err);
    res.status(500).send("Database error");
  }
};

// Handle the GET request to delete all players
exports.deleteAll = async (req, res) => {
  await db.deleteAllPlayers();
  res.redirect("/");
};
