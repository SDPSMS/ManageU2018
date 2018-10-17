import { sendMessage } from '../service/emailService'

const fs = require('fs')

export default (app) => {
  app.post('/sendupdatemessage', sendMessage)
  app.post('/staffs', (req, res) => {
    fs.readFile('../Server/Resources/utsdummydatabase.json', function read (err, data) {
      if (err) {
        return err
      }
      const dataSource = JSON.parse(data)

      for (let staff of dataSource.staffs) {
        if (staff.password === req.body.password && staff.email === req.body.email) {
          res.send('Yes')
          return
        }
      }
      res.status(401)
      res.send('None shall pass')
    })
  })
  app.post('/students', (req, res) => {
    fs.readFile('../Server/Resources/utsdummydatabase.json', function read (err, data) {
      if (err) {
        console.log('Register error!')
        return err
      }
      const dataSource = JSON.parse(data)

      for (let student of dataSource.students) {
        if (student.email === req.body.email) {
          res.send('Yes')
          return
        }
      }
      res.status(401)
      res.send('None shall pass')
    })
  })
}
