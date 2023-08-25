import { UserModel } from "./models.js"
import { dbClose } from "./db.js"

const fakeUsers = [
  {email: "fakeemail@example.com", password: "password", phoneNumber: "0412345678", firstName: "John", lastName: "Smith", isManager: true},
  {email: "fakestemail50@example.com", password: "password", phoneNumber: "0487654321", firstName: "Paul", lastName: "Allen", isManager: false}
  ]

await UserModel.deleteMany()
console.log('Deleted Users')
await UserModel.insertMany(fakeUsers)
console.log('Inserted Categories')

dbClose()