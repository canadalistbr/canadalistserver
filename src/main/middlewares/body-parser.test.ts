import request from 'supertest'
import app from '../config/app'
describe('', () => {
  it('', async () => {
    app.post('/body-parser-json', (req, res) => {
      return res.send(req.body)
    })

    await request(app)
    .post('/body-parser-json')
    .send({name: 'Rodrigo'})
    .expect({name: 'Rodrigo'})
  })
})
