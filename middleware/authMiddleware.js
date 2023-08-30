import jwt from 'jsonwebtoken'
import { UserModel } from "../db.js"
import dotenv from 'dotenv'

dotenv.config()

const protect = async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await UserModel.findById(decoded.id).select('-password')

      next()

    } catch (err) {
        res.status(401).send({ error: 'Not authorised' })}
      }
  if (!token) {
    res.status(401).send({ error: 'Not authorized, no token' })
  }
}

export { protect }