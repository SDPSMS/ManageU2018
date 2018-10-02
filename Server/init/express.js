import bodyParser from 'body-parser'

export default (app) => {
  app.set('port', (process.env.PORT || 3000))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  console.log('--------------------------')
  console.log('===> 😊  Starting Server . . .')
  console.log(`===>  Listening on port: ${app.get('port')}`)
  console.log('--------------------------')
}
