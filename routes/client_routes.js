import { Router } from "express"
import { ClientModel, UserModel } from "../db.js"

const router = Router()

// GET all clients
router.get('/', async (req, res) => 
  res.send(await ClientModel.find()
    .populate({ path: 'assignedWorkers' })
    .populate({ path: 'clientNotes' })
  ))

// GET singular client
router.get('/:id', async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id)
      .populate({ path: 'assignedWorkers' })
      .populate({ path: 'clientNotes' })
    if (client) {
      res.send(client)
    } else {
      res.status(404).send({ error: 'Client not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new client
router.post('/', async (req, res) => {
  try {
    const newClient = await ClientModel.create(req.body)
    res.status(201).send(newClient)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
    res.status(400).send({ error: err.message })
  } else {
    res.status(500).send({ error: err.message })
  }}
})

// PUT update a client
// Not working yet

// router.put('/:id', async (req, res) => {
//   try {
//     let updatedClient = {}
//     updatedClient = req.body
//     if (updatedClient.assignedWorkers) {
      
//       const checkIfUserExists = await UserModel.find({ '_id': { $in: updatedClient.assignedWorkers}})
//       console.log('test')
//       for (let i in checkIfUserExists) {
//         console.log(i)
//         if (checkIfUserExists[i]._id == updatedClient.assignedWorkers) {
//           console.log('worked')
//         } else {
//           console.log('didnt work')
//         }
//       }
//     }
//     res.sendStatus(200)
//   }
//   catch (err) {
//     if (err.name == 'ValidationError' || 'CastError') {
//       res.status(400).send({ error: err.message })
//   } else {
//     res.status(500).send({ error: err.message })
// }}})


// Delete a client
router.delete('/:id', async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id)
    if (client) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Client not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router