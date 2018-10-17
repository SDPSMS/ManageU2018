import Secrets from 'react-native-config-node'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(Secrets.SENDGRID_API_KEY)

export function sendMessage (req, res, next) {
  sgMail.send({
    to: req.body.receiver,
    from: 'ManageU@manage.com',
    subject: 'One of your seminar has been updated',
    text: 'Check your seminar now to see the updated seminar'
  }, (err, json) => {
    if (err) {
      res.send('no')
    }
    res.send('yay')
  })
}
