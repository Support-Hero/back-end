import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Support Hero!' }))

app.use('/users', userRoutes)

export default app