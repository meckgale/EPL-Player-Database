#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  player_name VARCHAR ( 255 ) NOT NULL,
  player_position VARCHAR ( 255 ) NOT NULL,
  team_name VARCHAR ( 255 ) NOT NULL
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost", // or wherever the db is hosted
    user: process.env.USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: 5432, // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
