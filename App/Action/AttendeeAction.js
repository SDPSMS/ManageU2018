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

function attendSeminarSuccess (name, status, email, seminarid) {
  return {
    type: types.SEMINAR_ATTEND_SUCCESS,
    payload: ({ name, status, email, id: seminarid }),
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

export function attendSeminarFinish () {
  return {
    type: types.SEMINAR_ATTEND_FINISH
  }
}

export function attendSeminar (name, email, status, seminarid) {
  return (dispatch) => {
    dispatch({ type: types.SEMINAR_ATTEND_START })
    checkStudentsDatabaseForRegister(email).then((response) => {
      if (response.ok) {
        const useridlists = []
        const emaillists = []
        // TODO: Dispatch what state and navigation?
        firebase.database().ref(`attendeelist/${seminarid}`).once('value')
          .then((snapshot) => {
            Object.keys(snapshot.val()).map((k) => {
              useridlists.push(snapshot.val()[k].id)
            })
          })
          .then(async () => {
            let id
            for (id in useridlists) {
              await firebase.database().ref(`attendees/${useridlists[id]}`).once('value').then((snapshot) => {
                emaillists.push(snapshot.val().email)
              })
            }
          })
          .catch(() => {
            console.log('EMPTY, CREATING NEW REF.')
          })
          .then(() => {
            if (_.includes(emaillists, email)) {
              // TODO: Dispatch error message.
              dispatch(attendSeminarError())
            } else {
              const newAttendee = firebase.database().ref('attendees').push({ name, status, email })
              firebase.database().ref(`attendees/${newAttendee.getKey()}`).update({ id: newAttendee.getKey() })
              firebase.database().ref(`attendeelist/${seminarid}/${newAttendee.getKey()}`).set({ id: newAttendee.getKey() })
                .then(() => dispatch(attendSeminarSuccess(name, status, email, seminarid)))
            }
          })
      } else {
        // TODO: Dispatch a message saying that this email is not a trusted UTS email so they need to contact the Organiser
        dispatch(attendSeminarFailed())
      }
    })
      .catch(() => { console.log('Attend Seminar failed!') })
  }
  //   dispatch({type: types.SEMINAR_ATTEND_START})
  //   const useridlists = []
  //   const emaillists = []
  //   // TODO: Dispatch what state and navigation?
  //   firebase.database().ref(`attendeelist/${seminarid}`).once('value')
  //     .then((snapshot) => {
  //       Object.keys(snapshot.val()).map((k) => useridlists.push(snapshot.val()[k]))
  //     })
  //     .then(async () => {
  //       let id
  //       for (id in useridlists) {
  //         await firebase.database().ref(`attendees/${useridlists[id]}`).once('value').then((snapshot) => {
  //           emaillists.push(snapshot.val().email)
  //         })
  //       }
  //     })
  //     .then(() => {
  //       if (_.includes(emaillists, email)) {
  //         // TODO: Dispatch error message.
  //         dispatch(attendSeminarError())
  //       } else {
  //         const newAttendee = firebase.database().ref('attendees').push({ name, email })
  //         firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
  //           .then(() => dispatch(attendSeminarSuccess()))
  //       }
  //     })
  // }
}

export function deleteAttendeeStart () {
  return ({ type: 'DELETE_ATTENDEE_START' })
}

export function deleteAttendee (seminarId, attendeeId) {
  return (dispatch) => {
    dispatch({ type: 'ATTENDEE_LOADING' })
    firebase.database().ref(`attendeelist/${seminarId}/${attendeeId}`).remove()
      .then(() => {
        firebase.database().ref(`attendees/${attendeeId}`).remove()
          .then(() => {
            dispatch({ type: types.DELETE_ATTENDEE_SUCCESS, payload: attendeeId })
          })
      })
      .catch(() => {
      })
  }
}

export function editAttendeeStart (attendeeId) {
  return ({ type: 'EDIT_ATTENDEE_START', payload: attendeeId })
}

export function editAttendee (attendeeId, name, status, email) {
  return (dispatch) => {
    dispatch({ type: 'ATTENDEE_LOADING' })
    checkStudentsDatabaseForRegister(email).then((response) => {
      if (response.ok) {
        firebase.database().ref(`attendees/${attendeeId}`)
          .update({ email, id: attendeeId, name, status })
          .then(() => {
            dispatch({ type: 'EDIT_ATTENDEE_SUCCESS', payload: ({ email, id: attendeeId, name, status }) })
          })
      } else {
        dispatch({ type: 'EDIT_ATTENDEE_FAIL', error: 'Can only change to valid UTS Student/Staff email!' })
      }
    })
  }
}

export function closeModal () {
  return ({ type: 'CLOSE_MODAL' })
}
