"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
console.log('rolling back', process.argv[2]);
(0, db_1.rollbackMigration)(process.argv[2]);
