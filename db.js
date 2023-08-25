import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

await mongoose.connect(process.env.ATLAS_DB_URL)
console.log('Database connected')

// Defining the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isManager: { type: Boolean, required: true },
  clients: { type: []}
})
// Defining the user model from the user schema
const UserModel = mongoose.model('User', userSchema)

// Defining the client schema


// Defining the client notes schema


export { UserModel, dbClose }