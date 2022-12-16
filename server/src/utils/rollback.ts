import { rollbackMigration } from './db'

console.log('rolling back', process.argv[2])
rollbackMigration(process.argv[2])
