import NavigationActions from '../Services/NavigationService'
import firebase from 'firebase'
import _ from 'lodash'
import * as types from '../Types/actionType'

function attendSeminarError () {
  return {
    type: types.SEMINAR_ATTEND_ERROR,
    message: 'You are already registered to this seminar'
  }
}

function attendSeminarSuccess () {
  return {
    type: types.SEMINAR_ATTEND_SUCCESS,
    message: 'Successfully registered, now you can close this registration!'
  }
}

export function attendSeminar (name, email, seminarid) {
  return (dispatch) => {
    dispatch({ type: types.SEMINAR_ATTEND_START })
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
          dispatch(attendSeminarError())
        } else {
          const newAttendee = firebase.database().ref('attendees').push({ name, email })
          firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
            .then(() => dispatch(attendSeminarSuccess()))
        }
      })
  }
}
