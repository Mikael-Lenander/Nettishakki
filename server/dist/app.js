"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./utils/db");
require("./database-models");
const db_2 = require("./utils/db");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const game_1 = __importDefault(require("./routes/game"));
const middleware_1 = require("./utils/middleware");
const app = (0, express_1.default)();
const initDatabase = async () => {
    await (0, db_1.connectToDatabase)();
    await (0, db_2.runMigrations)();
};
initDatabase();
app.use(express_1.default.static('build'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/games', middleware_1.authenticateToken, game_1.default);
exports.default = app;
