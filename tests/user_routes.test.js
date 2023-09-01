import app from '../app.js'
import request from 'supertest'

// User route tests
// describe("User route tests", () => {
//   let token
//   beforeAll(async () => {
//     request(app).post('/login').send({
//       email: 'emma@example.com',
//       password: 'password',
//     })
//     ((err, res) => {
//       token = res.body.token
//     })
//   })
//   test('Get /', async () => {
//     request(app).get('/users').set('Authorization', 'Bearer ' + token)
//     .expect(200, done)}
//   )})