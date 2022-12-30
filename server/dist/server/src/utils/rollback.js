"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
(0, db_1.rollbackMigration)(process.argv[2]);
