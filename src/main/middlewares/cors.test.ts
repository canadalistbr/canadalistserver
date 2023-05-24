import request from 'supertest'
import app from '../config/app'
describe('', () => {
  it('', async () => {
    app.get('/test-cors', (req, res) => {
      return res.send('')
    })
    await request(app)
      .get('/test-cors')
      .expect('access-control-origin', '*')
      .expect('access-control-methods', '*')
      .expect('access-control-headers', '*')
  })
})
