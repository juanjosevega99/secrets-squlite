"use strict";

const path = require("path");
const { Database } = require("sqlite3").verbose();

const db = new Database(path.join(__dirname, "..", "secrets.db"));
const queries = {
  tableUsers: `
    CREATE TABLE IF NOT EXISTS users (
      user TEXT PRIMARY KEY,
      pass TEXT NOT NULL
    );
  `,
  tableSecrets: `
    CREATE TABLE IF NOT EXISTS secrets (
      user TEXT,
      name TEXT NOT NULL
      value TEXT NOT NULL
    );
  `,
};

async function createDb() {
  return new Promise((resolve, reject) => {
    resolve({
      client: db,
    });
  });
}

module.exports = {
  createDb,
};
