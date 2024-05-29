import { defineConfig } from 'drizzle-kit'
import { load, loadEnvFile, DatabaseConfig } from './config'

loadEnvFile('.env')
const dbConfig: DatabaseConfig = load(DatabaseConfig)

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.DATABASE_HOST,
    database: dbConfig.DATABASE_DATABASE,
    user: dbConfig.DATABASE_USER,
    password: dbConfig.DATABASE_PASSWORD,
    port: dbConfig.DATABASE_PORT,
    ssl: dbConfig.DATABASE_SSL,
  },
})
