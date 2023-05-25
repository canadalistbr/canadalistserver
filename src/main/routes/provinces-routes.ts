import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeProvinces } from '../factories/provinces/provinces-factory'

export default (route: Router) => {
  route.get('/provinces',routeAdapter(makeProvinces()))
}
