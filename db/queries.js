const pool = require("./pool");

async function getAllPlayers() {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
}

async function searchPlayers(searchTerm, teamTerm, positionTerm) {
  let baseQuery = "SELECT * FROM players WHERE 1=1";
  const params = [];

  try {
    // Add search for player name if provided
    if (searchTerm) {
      baseQuery += " AND player_name ILIKE $" + (params.length + 1);
      params.push(`%${searchTerm}%`);
    }

    // Add search for team name if not "All"
    if (teamTerm && teamTerm !== "All") {
      baseQuery += " AND team_name ILIKE $" + (params.length + 1);
      params.push(`%${teamTerm}%`);
    }

    // Add search for position if not "All"
    if (positionTerm && positionTerm !== "All") {
      baseQuery += " AND player_position ILIKE $" + (params.length + 1);
      params.push(`%${positionTerm}%`);
    }

    // Debugging: Log the query and parameters for review
    console.log("Executing query:", baseQuery);
    console.log("With parameters:", params);

    const { rows } = await pool.query(baseQuery, params);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error("Database query failed.");
  }
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

async function getPlayerById(id) {
  const { rows } = await pool.query("SELECT * FROM players WHERE id = $1", [
    id,
  ]);
  console.log("Player fetched from DB for update:", rows[0]);
  return rows[0];
}

async function deletePlayersByIds(ids) {
  const query = `DELETE FROM players WHERE id = ANY($1)`;
  await pool.query(query, [ids]);
}

async function updatePlayer(id, name, position, team) {
  try {
    const query = `
      UPDATE players 
      SET player_name = $1, player_position = $2, team_name = $3 
      WHERE id = $4
    `;
    const params = [name, position, team, id];
    await pool.query(query, params);
  } catch (err) {
    console.error("Error updating player:", err);
    throw new Error("Database update failed");
  }
}

module.exports = {
  getAllPlayers,
  searchPlayers,
  insertPlayer,
  deleteAllPlayers,
  getPlayerById,
  deletePlayersByIds,
  updatePlayer,
};
