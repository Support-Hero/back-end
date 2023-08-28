import { Router } from "express"
import { UserModel } from "../db.js"

const router = Router()

// GET all users
router.get('/', async (req, res) => res.send(await UserModel.find().populate({ path: 'clients'})))

// Get singular users
router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate({ path: 'clients'})
    
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body)
    res.status(201).send(newUser)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
    res.status(400).send({ error: err.message })
  } else {
    res.status(500).send({ error: err.message })
  }}
})

// Maybe a better solution than chaining if statements ?
// PUT update a user
router.put('/', async (req, res) => {
  try {
    const updatedUser = {}
    if (req.body.email) {
      updatedUser.email = req.body.email
    }
    if (req.body.password) {
      updatedUser.password = req.body.password
    }
    if (req.body.phoneNumber) {
      updatedUser.phoneNumber = req.body.phoneNumber
    }
    if (req.body.firstName) {
      updatedUser.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      updatedUser.lastName = req.body.lastName
    }
    if (req.body.isManager) {
      updatedUser.isManager = req.body.isManager
    }
    if (req.body.clients) {
      const clients = await ClientModel.find({ name: req.body.category })
      if (clients) {
        updatedUser.clients = clients
      } else {
        res.status(400).send({ error: 'Clients not found' })
      }
    }
    const user = await UserModel.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
    if (entry) {
      res.send(entry)
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  }
  catch (err) {
      res.status(500).send({ error: err.message })
    }
  
})

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (user) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router