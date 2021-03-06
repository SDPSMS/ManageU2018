import firebase from 'firebase'
import NavigationActions from '../Services/NavigationService'
import API from '../Services/Api'
import * as types from '../Types/actionType'
import ConvertToTimestamp from '../Transforms/ConvertDateToTimestamp'
import moment from 'moment'

function loadSeminarStart () {
  return {
    type: 'LOAD_SEMINAR_START'
  }
}

export function loadAllSeminars () {
  return (dispatch) => {
    dispatch(loadSeminarStart())

    const seminarRef = firebase.database().ref('seminars')
    seminarRef.orderByChild('startDate').once('value')
      .then((snapshot) => {
        let seminarslists = []
        snapshot.forEach((seminar) => {
          seminarslists.push(seminar.val())
        })
        return seminarslists
      })
      .then((seminarslists) => {
        console.log(seminarslists)
        dispatch({ type: 'LOAD_ALL_SEMINAR', payload: seminarslists })
      })
  }
}

export function selectSeminar (seminarId) {
  return (dispatch) => {
    dispatch({ type: 'SELECTED_SEMINAR', payload: seminarId })
    dispatch(NavigationActions.push('SeminarDetails'))
  }
}

export function unselectSeminar () {
  return (dispatch) => {
    dispatch(NavigationActions.goBack())
    dispatch({ type: 'NONE_SELECTED' })
  }
}

export function editSeminar (seminar) {
  return (dispatch) => {
    dispatch({ type: 'EDIT_SEMINAR', payload: seminar })
    dispatch(NavigationActions.push('AbstractEdit'))
  }
}

export function saveSeminar ({ abstract, date, startTime, endTime, label, speaker, venue, id, venueCapacity, ownername, host }) {
  const { currentUser } = firebase.auth()
  const startDate = ConvertToTimestamp(date, startTime)
  const endDate = ConvertToTimestamp(date, endTime)
  return (dispatch) => {
    firebase.database().ref(`seminars/${id}`)
      .update({ abstract, startDate, endDate, label, speaker, venue, venueCapacity, ownername, host })
      .then(() => {
        // SAVE SEMINAR IN THE DATABASE
        dispatch({
          type: 'SAVE_SEMINAR',
          payload: { id, abstract, startDate, endDate, label, speaker, venue, venueCapacity, ownername, host }
        })
        dispatch(NavigationActions.navigate('SeminarList'))
      })
      .catch(() => {
        dispatch({ type: types.SEMINAR_SAVE_FAILED })
      })
    // handle catch as well.
  }
}

export function deleteSeminar (seminarId) {
  return (dispatch) => {
    firebase.database().ref(`seminars/${seminarId}`)
      .remove()
      .then(() => {
        // after remove, we dispatch the actions so that the redux state can be updated.
        dispatch({ type: 'DELETE_SEMINAR', payload: seminarId })
        dispatch(NavigationActions.navigate('SeminarList'))
      })
  }
}

export function startAddSeminar () {
  return (dispatch) => {
    dispatch({ type: types.START_ADD_SEMINAR })
    dispatch(NavigationActions.push('Abstract'))
  }
}

export function addNewSeminar ({ abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, organiserName, host, seminardesc }) {
  const { currentUser } = firebase.auth()
  const startDate = ConvertToTimestamp(date, startTime)
  const endDate = ConvertToTimestamp(date, endTime)
  return (dispatch) => {
    // setting the current user uid (who created the seminar) as a foreign key in the seminars entity.
    const ref = firebase.database().ref('seminars').push()
    const key = ref.getKey()
    ref.set({
      id: key,
      abstract,
      startDate,
      endDate,
      label,
      speaker,
      venue,
      venueCapacity,
      host,
      seminardesc,
      ownerid: currentUser.uid,
      ownername: organiserName
    })
      .then(() => {
        dispatch({
          type: 'ADD_SEMINAR',
          payload: {
            id: key,
            abstract,
            startDate,
            endDate,
            label,
            speaker,
            venue,
            venueCapacity,
            host,
            seminardesc,
            ownerid: currentUser.uid,
            ownername: organiserName
          }
        })
        dispatch(NavigationActions.navigate('SeminarList'))
      })
  }
}

export function formUpdate ({ prop, value }) {
  return {
    type: 'FORM_UPDATE',
    payload: {
      prop, value
    }
  }
}

export function loadAttendeeStart () {
  return (dispatch) => {
    dispatch({ type: 'LIST_ATTENDEE_START' })
    dispatch(NavigationActions.navigate('SeminarAttendeesView'))
  }
}

function loadAttendeeFinish () {
  return {
    type: 'LIST_ATTENDEE_FINISH'
  }
}

function loadAttendeeEmpty (attendeesListAndDetails) {
  return {
    type: types.EMPTY_ATTENDEE,
    message: 'This seminar does not have any attendee yet',
    payload: attendeesListAndDetails
  }
}

export function loadAttendees (seminarId) {
  return async (dispatch) => {
    try {
      const a = []
      const attendeeListRef = await firebase.database().ref(`attendeelist/${seminarId}`)
      attendeeListRef.once('value').then(snapshot => {
        console.log(snapshot.hasChildren())
        if (snapshot.hasChildren()) {
          snapshot.forEach((attendeeid) => {
            const attendeesDetailsRef = firebase.database().ref(`attendees/${attendeeid.key}`)
            attendeesDetailsRef.once('value', snap => {
              a.push(snap.val())
            })
              .then(() => {
                if (a.length === 0) {
                  dispatch(loadAttendeeEmpty(a))
                } else {
                  dispatch({ type: 'FETCH_ATTENDEE_LISTS', payload: a })
                  dispatch(loadAttendeeFinish())
                }
              })
          })
        } else {
          dispatch(loadAttendeeEmpty(a))
        }
      })
        .catch(() => {
          dispatch(loadAttendeeEmpty(a))
        })
    } catch (err) {
      console.log(err)
    }
  }
}

export function deleteOldSeminars () {
  return (dispatch) => {
    const oldSeminarIdLists = []
    firebase.database().ref('seminars').orderByChild('endDate').endAt(moment().valueOf()).once('value')
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          oldSeminarIdLists.push(snap.val().id)
          firebase.database().ref(`attendeelist/${snap.val().id}`).once('value').then((snapshot) => {
            snapshot.forEach((attendee) => {
              firebase.database().ref(`attendees/${attendee.val().id}`).remove()
                .then(() => console.log('success to delete old seminars'))
                .catch(() => console.log('failed to delete old seminars'))
            })
          })
          firebase.database().ref(`attendeelist/${snap.val().id}`).remove()
            .then(() => console.log('deleted attendeelists!'))
          firebase.database().ref(`seminars/${snap.val().id}`).remove()
            .then(() => console.log('deleted seminars!'))
        })
      })
      .then(() => {
      })
  }
}

// export function sortSeminarByDate () {
//   return (dispatch) => {
//     const sorted = []
//     // Sort by date.
//     firebase.database().ref('seminars').orderByChild('time').once('value').then((snapshot) => {
//       snapshot.forEach((snap) => {
//         sorted.push(snap.val())
//       })
//     }).then(() => {
//       if (sorted.length !== 0) {
//         dispatch({type: 'SORT_SEMINAR_DATE', payload: sorted})
//       } else {
//         dispatch({type: 'SORT_SEMINAR_DATE', message: 'No Seminar in the given date found!'})
//       }
//     })
//   }
// }

export function sortSeminarByDate (startDate, endDate) {
  return (dispatch) => {
    const startDateTS = ConvertToTimestamp(startDate)
    const endDateTS = ConvertToTimestamp(endDate)
    // Sort by date.
    firebase.database().ref('seminars').orderByChild('startDate').startAt(startDateTS).endAt(endDateTS).on('value', (snapshot) => {
      if (snapshot.val() != null && snapshot.val().length !== 0) {
        dispatch({ type: types.SORT_SEMINAR_SUCCESS, payload: snapshot.val() })
      } else {
        dispatch({ type: types.SORT_SEMINAR_ERROR, message: 'No Seminar in the given date range found!' })
      }
    })
  }
}

export function sortSeminarByVenue (venue) {
  return (dispatch) => {
    // Sort by date.
    firebase.database().ref('seminars').orderByChild('venue').equalTo(venue).on('value', (snapshot) => {
      if (snapshot.val() != null && snapshot.val().length !== 0) {
        dispatch({ type: types.SORT_SEMINAR_SUCCESS, payload: snapshot.val() })
      } else {
        dispatch({ type: types.SORT_SEMINAR_ERROR, message: `No Seminar in the room ${venue} found!` })
      }
    })
  }
}

export function getSeminarBySpeaker (speaker) {
  return (dispatch) => {
    // Sort by date.
    firebase.database().ref('seminars').orderByChild('speaker').equalTo(speaker).on('value', (snapshot) => {
      if (snapshot.val() != null && snapshot.val().length !== 0) {
        dispatch({ type: types.SORT_SEMINAR_SUCCESS, payload: snapshot.val() })
      } else {
        dispatch({ type: types.SORT_SEMINAR_ERROR, message: `No Seminar with name ${speaker} found!` })
      }
    })
  }
}

// There should only be one organiser for a seminar, therefore, an organiser name should be unique?
export function getSeminarByOrganiserName (organiserName) {
  return (dispatch) => {
    firebase.database().ref('seminars').orderByChild('ownername').equalTo(organiserName).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        dispatch({ type: types.SORT_SEMINAR_SUCCESS, payload: snapshot.val() })
      } else {
        dispatch({
          type: types.SORT_SEMINAR_ERROR,
          message: `No seminars with Organiser name ${organiserName} found.`
        })
      }
    })
  }
}

async function sendEmail (emails) {
  const api = API.create()
  await api.sendEmail(emails)
}

export function sendUpdateEmailNotif (seminarid) {
  return (dispatch) => {
    console.log(seminarid)
    // orderBy equalTo
    firebase.database().ref('attendeelist').child(seminarid)
      .once('value').then((snapshot) => {
        snapshot.forEach((attendeeid) => {
          console.log(attendeeid.val().id)
          firebase.database().ref('attendees').child(attendeeid.val().id)
            .once('value').then((snapshot) => {
              console.log(snapshot.val().email)
              sendEmail(snapshot.val().email).then(() => {
                console.log('success')
              })
                .catch(() => console.log('Fail to send update email notifications'))
            })
            .catch(() => console.log('Failed '))
        })
      })
      .catch(() => console.log('has problem with child attendee lists'))
  }
}
