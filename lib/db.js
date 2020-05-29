"use strict";

const path = require("path");
const bcrypt = require("bcrypt");
const { Database } = require("sqlite3").verbose();

const saltRounds = 5;
const client = new Database(path.join(__dirname, "..", "secrets.db"));
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
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (user, name)
      FOREIGN KEY (user)
        REFERENCES users (user)
          ON DELETE CASCADE
          ON UPDATE NO ACTION
    );
  `,
};

async function createDb() {
  return new Promise((resolve, reject) => {
    client.serialize(() => {
      client.run(queries.tableUsers);
      client.run(queries.tableSecrets, (err) => {
        if (err) return reject(err);

        resolve({
          client,
          createUser,
        });
      });
    });
  });
}

async function createDb(user, pass) {
  const securePass = await bcrypt.hash(pass, saltRounds);
  return new Promise((resolve, reject) => {
    const stmt = client.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run(user, pass);
    stmt.finalize((err) => {
      if (err) return reject(err);

      resolve();
    });
  });
}

module.exports = {
  createDb,
};
