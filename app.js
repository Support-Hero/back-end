import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_routes.js'
import clientRoutes from './routes/client_routes.js'
import noteRoutes from './routes/client_notes_routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Support Hero!' }))

app.use('/users', userRoutes)

app.use('/clients', clientRoutes)

app.use('/notes', noteRoutes)

export default app