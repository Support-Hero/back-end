import { Router } from "express"
import { ClientNotesModel } from "../db.js"

const router = Router()

// GET all notes
router.get('/', async (req, res) => res.send(await ClientNotesModel.find()
  .populate({ path: 'author'})
  .populate({ path: 'client'})
))

// Get singular note
router.get('/:id', async (req, res) => {
  try {
    const note = await ClientNotesModel.findById(req.params.id)
      .populate({ path: 'author'})
      .populate({ path: 'client'})
    if (note) {
      res.send(note)
    } else {
      res.status(404).send({ error: 'Note not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new note
router.post('/', async (req, res) => {
  try {
    const newNote = await ClientNotesModel.create(req.body)
    res.status(201).send(newNote)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
    res.status(400).send({ error: err.message })
  } else {
    res.status(500).send({ error: err.message })
  }}
})

// PUT update a note
// TODO

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await ClientNotesModel.findByIdAndDelete(req.params.id)
    if (note) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Note not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router