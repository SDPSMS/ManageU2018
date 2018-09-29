import NavigationActions from '../Services/NavigationService'
import firebase from 'firebase'

export function attendSeminar (name, email, seminarid) {
  return (dispatch) => {
    // TODO: Dispatch what state?
    const newAttendee = firebase.database().ref('attendees').push({name, email})
    firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
  }
}
