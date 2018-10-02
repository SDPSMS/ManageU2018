import { sendMessage } from './service/emailService'
import express from 'express'
import initExpress from './init/express'
import initRoutes from './init/routes'

const app = express()

initExpress(app)

initRoutes(app)

app.listen(app.get('port'))
