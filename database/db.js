import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

await mongoose.connect(process.env.ATLAS_DB_URL)
console.log('Database connected')

export { dbClose }