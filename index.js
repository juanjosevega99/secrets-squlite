#!/usr/bin/env node

"use strict";

const minimist = require("minimist");
const argv = minimist(process.argv.slice(2));

async function main() {
  const command = argv._.shift();

  switch (command) {
    case "users:create":
      break;
    case "users:list":
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
