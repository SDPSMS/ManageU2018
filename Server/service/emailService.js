const sgMail = require('@sendgrid/mail')

// TODO: Set environment variables for API KEY.
sgMail.setApiKey('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')

export function sendMessage (req, res, next) {
  sgMail.send({
    to: req.body.receiver,
    from: 'SDP@manageU.com',
    subject: 'One of your seminar has been updated',
    text: 'Check your seminar now to see the updated seminar'
  }, (err, json) => {
    if (err) {
      res.send('no')
    }
    res.send('yay')
  })
}
