import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function dbOpen() {
  await mongoose.connect(process.env.ATLAS_DB_URL)
  console.log('Database connected')
}

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

export { dbOpen, dbClose }