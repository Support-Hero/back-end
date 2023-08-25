import { UserModel, ClientModel, dbClose } from "./db.js"

// An array of fake users
const fakeUsers = [
  {
    email: 'emma@example.com',
    password: 'emma1234',
    phoneNumber: '0412345678',
    firstName: 'Emma',
    lastName: 'Wilson',
    isManager: false,
  },
  {
    email: 'alex@example.com',
    password: 'pass123',
    phoneNumber: '0499876543',
    firstName: 'Alex',
    lastName: 'Brown',
    isManager: false
  },
  {
    email: 'sarah@example.com',
    password: 'sarahpass',
    phoneNumber: '0421987654',
    firstName: 'Sarah',
    lastName: 'Miller',
    isManager: true
  },
  {
    email: 'david@example.com',
    password: 'david987',
    phoneNumber: '0410123456',
    firstName: 'David',
    lastName: 'Lee',
    isManager: false
  },
  {
    email: 'olivia@example.com',
    password: 'olivia555',
    phoneNumber: '0432654321',
    firstName: 'Olivia',
    lastName: 'Smith',
    isManager: false
  }
]

// Insert fake users into the database
await UserModel.deleteMany()
console.log('Deleted Users')
const users = await UserModel.insertMany(fakeUsers)
console.log('Inserted users')

// Extracting multiple user object ids for referencing in clients collection
const twoUsers = [users[0], users[1]]
const threeUsers = [users[1], users[2], users[3]]

// An array of fake Clients
const fakeClients = [
  {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '0488888888',
    clientNotes: [
      {
        date: Date(),
        goals: 'lorem Ipsum',
        presentation: 'lorem Ipsum',
        actions: 'lorem Ipsum',
        outcome: 'lorem Ipsum',
        followUp: false
      },
      {
        date: Date(),
        goals: 'lorem Ipsum',
        presentation: 'lorem Ipsum',
        actions: 'lorem Ipsum',
        outcome: 'lorem Ipsum',
        followUp: false
      }],
      assignedWorkers: twoUsers
  },
  {
    firstName: 'Paul',
    lastName: 'Smith',
    address: '123 Fake Ave',
    phoneNumber: '0455555555',
    clientNotes: [
      {
        date: Date(),
        goals: 'lorem Ipsum dolor sit',
        presentation: 'lorem Ipsum dolor sit',
        actions: 'lorem Ipsum dolor sit',
        outcome: 'lorem Ipsum dolor sit et',
        followUp: true,
        followUpNote: 'lorem Ipsum Lore'
      },
      {
        date: Date(),
        goals: 'lorem Ipsum',
        presentation: 'lorem Ipsum',
        actions: 'lorem Ipsum',
        outcome: 'lorem Ipsum',
        followUp: false,
      }],
      assignedWorkers: threeUsers
  }
]
await ClientModel.deleteMany()
console.log('Deleted Clients')
const clients = await ClientModel.insertMany(fakeClients)
console.log('Inserted Clients')

async function addClientsToUsers (client, user) {
  const updatedEntry = {}
  updatedEntry.clients = client
  await UserModel.findByIdAndUpdate(user, updatedEntry)
  return console.log("added clients to users")
}

addClientsToUsers(clients[0], users[0])


console.log('Updated users with client references')
dbClose()