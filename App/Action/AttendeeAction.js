import NavigationActions from '../Services/NavigationService'
import firebase from 'firebase'
import _ from 'lodash'
import * as types from '../Types/actionType'
import API from '../Services/Api'
import { loadAttendees } from './SeminarAction'

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

export function attendSeminarFinish () {
  return {
    type: types.SEMINAR_ATTEND_FINISH
  }
}

export function attendSeminar (name, email, seminarid) {
  return (dispatch) => {
    dispatch({type: types.SEMINAR_ATTEND_START})
    checkStudentsDatabaseForRegister(email).then((response) => {
      if (response.ok) {
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
          .catch(() => {
            console.log('failed!')
          })
          .then(() => {
            if (_.includes(emaillists, email)) {
              // TODO: Dispatch error message.
              dispatch(attendSeminarError())
            } else {
              const newAttendee = firebase.database().ref('attendees').push({name, email})
              firebase.database().ref(`attendeelist/${seminarid}`).push(newAttendee.getKey())
                .then(() => dispatch(attendSeminarSuccess()))
            }
          })
      } else {
        // TODO: Dispatch a message saying that this email is not a trusted UTS email so they need to contact the Organiser
        dispatch(attendSeminarFailed())
      }
    })
      .catch(() => { console.log('failed!') }
      )
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

function loadAttendeeFinish () {
  return {
    type: 'LIST_ATTENDEE_FINISH'
  }
}

export function deleteAttendee (seminarId, attendeeId) {
  return (dispatch) => {
    console.log(seminarId, attendeeId)
    firebase.database().ref(`attendeelist/${seminarId}/${attendeeId}`).remove()
      .then(() => {
        firebase.database().ref(`attendees/${attendeeId}`).remove()
          .then(() => {
            const attendeesListAndDetails = []
            firebase.database().ref('attendeelist').child(seminarId)
              .once('value').then((snapshot) => {
              snapshot.forEach((attendeeid) => {
                firebase.database().ref('attendees').child(attendeeid.val())
                  .once('value')
                  .then((snapshot) => {
                    attendeesListAndDetails.push(snapshot.val())
                  })
              })
            })
              .then(() => {
                dispatch({type: 'FETCH_ATTENDEE_LISTS', payload: attendeesListAndDetails})
                dispatch(loadAttendeeFinish())
                dispatch({type: types.DELETE_ATTENDEE_SUCCESS})
              })
          })
      })
  }
}

export function editAttendee (attendeeId, name, email) {
  return (dispatch) => {
    firebase.database().ref(`attendees/${attendeeId}`)
      .update({name, email})
      .then(() => {
        // SAVE USER IN THE DATABASE
        dispatch({type: 'EDIT_ATTENDEE_SUCCESS'})
        dispatch(NavigationActions.push('SeminarAttendeesView'))
      })
  }
}
