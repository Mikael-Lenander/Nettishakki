"use strict";
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
const connectToDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Database connected');
    }
    catch (err) {
        console.log('Connecting database failed: ', err);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
const migrationConf = (file) => ({
    migrations: {
        glob: `src/migrations/${file}`
    },
    storage: new umzug_1.SequelizeStorage({ sequelize: exports.sequelize, tableName: 'migrations' }),
    context: exports.sequelize.getQueryInterface(),
    logger: console
});
const runMigrations = async () => {
    await exports.sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf('*.ts'));
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map(mig => mig.name)
    });
};
exports.runMigrations = runMigrations;
const rollbackMigration = async (file) => {
    await exports.sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf(file));
    await migrator.down();
};
exports.rollbackMigration = rollbackMigration;
