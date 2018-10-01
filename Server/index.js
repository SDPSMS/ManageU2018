const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.post('/test', (request, response) => {
  console.log(request.body)
  response.json(request.body)
})

app.post('/sendupdatemessage', sendMessage)

app.set('port', (process.env.PORT || 3000))

app.get('/staffs', (req, res) => {
  // TODO: Change data to database (MONGODB?) here instead.
  res.send({
    'staffs': [
      {
        'name': 'Jason James',
        'email': 'jason.james@staff.uts.edu.au'
      },
      {
        'name': 'Sasaki Rina',
        'email': 'sasaki.rina@staff.uts.edu.au'
      },
      {
        'name': 'James Guedes',
        'email': 'guedes.james@staff.uts.edu.au'
      },
      {
        'name': 'Chun Li',
        'email': 'li.chun@staff.uts.edu.au'
      },
      {
        'name': 'Alissa Keep',
        'email': 'keep.alissa@staff.uts.edu.au'
      },
      {
        'name': 'A',
        'email': 'A'
      }
    ]
  })
})

app.get('/', (req, res) => {
  res.send('Hello from express!')
})

app.listen(app.get('port'), (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log('--------------------------')
  console.log('===> 😊  Starting Server . . .')
  console.log(`===>  Listening on port: ${app.get('port')}`)
  console.log('--------------------------')
})

// // Invoked everytime a request hits the server.
// const requestHandler = (request, response) => {
//   console.log(request.url)
//   response.end('Hello Node.js server!')
// }
//
// const server = http.createServer(requestHandler)
//
// server.listen(port, (err) => {
//   // If there is an error to the server, display this message.
//   if (err) {
//     return console.log('something bad happened', err)
//   }
//
//   console.log(`Server is listening on port:${port}`)
// })
