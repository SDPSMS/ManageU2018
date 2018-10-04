import NavigationActions from '../Services/NavigationService'
import firebase from 'firebase'
import _ from 'lodash'

export function attendSeminar (name, email, seminarid) {
  return (dispatch) => {
    const useridlists = []
    const emaillists = []
    // TODO: Dispatch what state and navigation?
    firebase.database().ref(`attendeelist/${seminarid}`).once('value')
      .then((snapshot) => {
        Object.keys(snapshot.val()).map((k) => useridlists.push(snapshot.val()[k]))
      })
      .then(async () => {
        let id
        for (id in useridlists) {
          await firebase.database().ref(`attendees/${useridlists[id]}`).once('value').then((snapshot) => {
            emaillists.push(snapshot.val().email)
          })
        }
      })
      .then(() => {
        if (_.includes(emaillists, email)) {
          // TODO: Dispatch error message.
          console.log('cant add')
        } else {
          const newAttendee = firebase.database().ref('attendees').push({ name, email })
          firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
        }
      })
  }
}
