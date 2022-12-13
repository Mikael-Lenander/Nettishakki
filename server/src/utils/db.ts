import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config'
import { Umzug, SequelizeStorage } from 'umzug'

export const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (err) {
    console.log('Connecting database failed: ', err)
    process.exit(1)
  }
}

const migrationConf = (file: string) => ({
  migrations: {
    glob: `src/migrations/${file}`
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
})

export const runMigrations = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf('*.ts'))
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map(mig => mig.name)
  })
}
export const rollbackMigration = async (file: string) => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf(file))
  await migrator.down()
}
