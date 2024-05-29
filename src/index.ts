import { load, loadEnvFile, DatabaseConfig } from './config'

loadEnvFile('.env')
const dbConfig: DatabaseConfig = load(DatabaseConfig)

console.log(dbConfig)
