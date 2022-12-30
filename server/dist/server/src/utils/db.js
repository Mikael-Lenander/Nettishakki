"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollbackMigration = exports.runMigrations = exports.connectToDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const umzug_1 = require("umzug");
exports.sequelize = new sequelize_1.Sequelize(config_1.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log('Database connected');
    }
    catch (err) {
        console.log('Connecting database failed: ', err);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
const migrationConf = (file) => ({
    migrations: {
        glob: `src/migrations/${file}`
    },
    storage: new umzug_1.SequelizeStorage({ sequelize: exports.sequelize, tableName: 'migrations' }),
    context: exports.sequelize.getQueryInterface(),
    logger: console
});
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf('*.ts'));
    const migrations = yield migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map(mig => mig.name)
    });
});
exports.runMigrations = runMigrations;
const rollbackMigration = (file) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf(file));
    yield migrator.down();
});
exports.rollbackMigration = rollbackMigration;
