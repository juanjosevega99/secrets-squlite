#!/usr/bin/env node

"use strict";

const minimist = require("minimist");
const { createDb } = require("./lib/db");
const argv = minimist(process.argv.slice(2));

async function main() {
  const db = await createDb();
  const command = argv._.shift();

  switch (command) {
    case "users:create":
      try {
        const { user, pass } = argv;
        await db.creteUser(user, pass);
        console.log(`${user} created`);
      } catch (err) {
        throw new Error("Cannot create user");
      }
      break;
    case "users:list":
      try {
        const results = await db.listUsers();
        results.users.forEach((u) => {
          console.log(`- ${u.user}`);
        });
        console.log(`Total: ${results.count}`);
      } catch (err) {
        throw new Error("Cannot list user");
      }
      break;
    case "users:create":
      break;
    case "users:list":
      break;
    default:
      console.error(`command not found: ${command}`);
  }
}

main().catch((err) => console.log(err));
