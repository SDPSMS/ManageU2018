import { sendMessage } from '../service/emailService'

export default (app) => {
  app.post('/sendupdatemessage', sendMessage)
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
}
