"use strict";

const minimist = require("minimist");

console.log(process.argv);

const argv = minimist(process.argv.slice(2));

console.log(argv);
