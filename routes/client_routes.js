import { Router } from "express"
import { ClientModel } from "../db.js"

const router = Router()

// GET all clients
router.get('/', async (req, res) => res.send(await ClientModel.find().populate({ path: 'assignedWorkers'})))

// GET singular client
router.get('/:id', async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id).populate({ path: 'assignedWorkers'})
    
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

// PUT update a client

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