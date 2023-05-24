import request from 'supertest'
import app from '../config/app'
describe('', () => {
  it('', async () => {
    app.get('/test-content-type', (req, res) => {
      return res.send('')
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
