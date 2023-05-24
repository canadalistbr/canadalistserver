import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express) => {
  const routes = Router()
  app.use('/api', routes)
  fg.sync('**/src/main/routes/**routes.ts').map(async (file) => {
    const route = (await import(`../../../${file}`)).default
    route(routes)
  })

}
