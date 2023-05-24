import { Router } from 'express'

export default (route: Router) => {
  route.get('/provinces', (req, res) => {
    res.json({ cat: 'kiko' })
  })
}
