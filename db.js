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
  clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}]
})
// Defining the user model from the user schema
const UserModel = mongoose.model('User', userSchema)

// Defining the client notes schema
const clientNotesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  goals: { type: String, required: true },
  presentation: { type: String, required: true },
  actions: { type: String, required: true },
  outcome: { type: String, required: true },
  followUp: { type: Boolean, required: true },
  followUpNote: { type: String },
  author: {type: mongoose.ObjectId, ref: 'User', required: true },
  isMgrAuthorised: { type: Boolean, required: true },
  client: {type: mongoose.ObjectId, ref: 'Client', required: true }
})

// Defining the client notes model from the client notes schema
const ClientNotesModel = mongoose.model('ClientNotes', clientNotesSchema)

// Defining the client schema
const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true},
  phoneNumber: { type: String, required: true },
  clientNotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClientNotes'}],
  assignedWorkers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

// Defining the client model from the client schema
const ClientModel = mongoose.model('Client', clientSchema)


export { UserModel, ClientModel, ClientNotesModel, dbClose }