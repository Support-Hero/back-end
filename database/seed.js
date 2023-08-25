import { UserModel } from "./models.js"
import { dbOpen, dbClose } from "./db.js"

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   isManager: { type: Boolean, required: true },
//   clients: { type: []}
// })
dbOpen()
const fakeUsers = [
  {email: "fakeemail@example.com", password: "password", phoneNumber: "0412345678", firstName: "John", lastName: "Smith", isManager: true},
  {email: "fakestemail50@example.com", password: "password", phoneNumber: "0487654321", firstName: "Paul", lastName: "Allen", isManager: false}
  ]

await UserModel.deleteMany()
console.log('Deleted Users')
await UserModel.insertMany(fakeUsers)
console.log('Inserted Categories')

dbClose()