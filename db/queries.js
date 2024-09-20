const pool = require("./pool");

async function getAllPlayers() {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
}

// Function to search for usernames containing a specific term
async function searchPlayers(term) {
  const { rows } = await pool.query(
    "SELECT * FROM players WHERE player_name ILIKE $1",
    [`%${term}%`]
  );
  return rows;
}

async function insertPlayer(playerName, playerPosition, playerTeam) {
  await pool.query(
    "INSERT INTO players (player_name, player_position, team_name) VALUES ($1, $2, $3)",
    [playerName, playerPosition, playerTeam]
  );
}

// Function to delete all usernames
async function deleteAllPlayers() {
  await pool.query("DELETE FROM players");
}

module.exports = {
  getAllPlayers,
  searchPlayers,
  insertPlayer,
  deleteAllPlayers,
};
