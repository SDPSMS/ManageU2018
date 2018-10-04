import { sendMessage } from '../service/emailService'

const fs = require('fs')

export default (app) => {
  app.post('/sendupdatemessage', sendMessage)
  app.post('/staffs', (req, res) => {
    fs.readFile('./Server/init/staffs.json', function read (err, data) {
      if (err) {
        console.log('Register error!')
        return err
      }
      const dataSource = JSON.parse(data)

      for (let staff of dataSource.staffs) {
        if (staff.name === req.body.password && staff.email === req.body.email) {
          res.send('Yes')
          return
        }
      }
      res.status(401)
      res.send('None shall pass')
    })
  })
}
