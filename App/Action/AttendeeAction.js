import NavigationActions from '../Services/NavigationService'
import firebase from 'firebase'
import _ from 'lodash'
import * as types from '../Types/actionType'
import API from '../Services/Api'

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

function attendSeminarFailed () {
  return {
    type: types.SEMINAR_ATTEND_FAILED,
    message: 'Failed to register because your email is not a UTS Student Email, You need to contact ... to register'
  }
}

function checkStudentsDatabaseForRegister (email) {
  return API.create().checkStudentDatabaseForRegister(email)
}

export function attendSeminar (name, email, seminarid) {
  return (dispatch) => {
    dispatch({type: types.SEMINAR_ATTEND_START})
    checkStudentsDatabaseForRegister(email).then((response) => {
      if (response.ok) {
        const useridlists = []
        const emaillists = []
        // TODO: Problem with firebase navigation here.
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
              const newAttendee = firebase.database().ref('attendees').push({name, email})
                .then((snapshot) => {
                  firebase.database().ref('attendees').child(snapshot.getKey()).update({id: snapshot.getKey()})
                })
              firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
                .then(() => dispatch(attendSeminarSuccess()))
            }
          })
      } else {
        // TODO: Dispatch a message saying that this email is not a trusted UTS email so they need to contact the Organiser
        dispatch(attendSeminarFailed())
      }
    })
  }
}

export function deleteAttendee (seminarId, attendeeId) {
  return (dispatch) => {
    console.log(seminarId, attendeeId)
    firebase.database().ref(`attendees/${attendeeId}`)
      .remove()
      .then(() => {
        firebase.database().ref(`attendeelist/${seminarId}/${attendeeId}`).remove()
          .then(() => {
            dispatch({type: types.DELETE_ATTENDEE_SUCCESS})
            dispatch(NavigationActions.navigate('SeminarAttendeesView'))
          })
      })
  }
}
