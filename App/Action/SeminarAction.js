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

    // const seminars = []
    // const seminarRef = firebase.database().ref('seminars')
    // seminarRef.orderByChild('startDate').once('value').then((snapshot) => {
    //   snapshot.forEach(child => {
    //     console.log(child.val())
    //     seminars.push(child.val())
    //   })
    // })
    //   .then(() => dispatch({type: 'LOAD_ALL_SEMINAR', payload: seminars}))

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
    dispatch(NavigationActions.push('EditSeminar'))
  }
}

// TODO: Instead of using this, wrap everything in one object called details
export function saveSeminar ({ abstract, date, startTime, endTime, label, speaker, venue, id, venueCapacity }) {
  const { currentUser } = firebase.auth()
  const startDate = ConvertToTimestamp(date, startTime)
  const endDate = ConvertToTimestamp(date, endTime)
  return (dispatch) => {
    firebase.database().ref(`seminars/${id}`)
      .update({ abstract, startDate, endDate, label, speaker, venue, venueCapacity })
      .then(() => {
        // SAVE SEMINAR IN THE DATABASE
        dispatch({ type: 'SAVE_SEMINAR', payload: {id, abstract, startDate, endDate, label, speaker, venue, venueCapacity} })
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

export function addNewSeminar ({ abstract, date, startTime, endTime, label, speaker, venue, capacity, organiserName }) {
  const { currentUser } = firebase.auth()
  const startDate = ConvertToTimestamp(date, startTime)
  const endDate = ConvertToTimestamp(date, endTime)
  return (dispatch) => {
    // setting the current user uid (who created the seminar) as a foreign key in the seminars entity.
    const ref = firebase.database().ref('seminars').push()
    const key = ref.getKey()
    ref.set({ id: key, abstract, startDate, endDate, label, speaker, venue, venueCapacity: capacity, ownerid: currentUser.uid, ownername: organiserName })
      .then(() => {
        dispatch({ type: 'ADD_SEMINAR', payload: {id: key, abstract, startDate, endDate, label, speaker, venue, venueCapacity: capacity, ownerid: currentUser.uid, ownername: organiserName} })
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
  return (dispatch) => {
    let attendeesListAndDetails = []
    // orderBy equalTo
    firebase.database().ref(`attendeelist/${seminarId}`)
      .once('value').then((snapshot) => {
        snapshot.forEach((attendeeid) => {
          firebase.database().ref(`attendees/${attendeeid.key}`)
            .once('value')
            .then((snapshot) => {
              attendeesListAndDetails.push(snapshot.val())
            })
            .then(() => {
              dispatch({ type: 'FETCH_ATTENDEE_LISTS', payload: attendeesListAndDetails })
              // attendeesListAndDetails.length === 0 ? dispatch(loadAttendeeEmpty(attendeesListAndDetails)) : dispatch({ type: 'FETCH_ATTENDEE_LISTS', payload: attendeesListAndDetails })
              dispatch(loadAttendeeFinish())
            })
        })
      })
    dispatch(loadAttendeeEmpty())
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
                .then(() => console.log('success'))
                .catch(() => console.log('failed'))
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
    firebase.database().ref('users').orderByChild('name').equalTo(organiserName).once('value').then((snapshot) => {
      let id = 0
      const data = snapshot.val() || null
      if (data) {
        id = Object.keys(data)[0]
      }
      return id
    })
      .then((id) => {
        if (id !== 0) {
          firebase.database().ref('seminars').orderByChild('ownerid').equalTo(id).on('value', (snapshot) => {
            if (snapshot.val() != null) {
              dispatch({ type: types.SORT_SEMINAR_SUCCESS, payload: snapshot.val() })
            } else {
              dispatch({
                type: types.SORT_SEMINAR_ERROR,
                message: `${organiserName} exists but does not have any seminar`
              })
            }
          })
        } else {
          dispatch({ type: types.SORT_SEMINAR_ERROR, message: `No seminars with Organiser name ${organiserName} found.` })
        }
      })
  }
}

async function sendEmail (emails) {
  const api = API.create()
  await api.sendEmail(emails)
}

// TODO: Might not be right here.
export function sendUpdateEmailNotif (seminarid) {
  return (dispatch) => {
    let attendeesListAndDetails = []
    // orderBy equalTo
    firebase.database().ref('attendeelist').child(seminarid)
      .once('value').then((snapshot) => {
        snapshot.forEach((attendeeid) => {
          firebase.database().ref('attendees').child(attendeeid.val())
            .once('value').then((snapshot) => {
              attendeesListAndDetails.push(snapshot.val())
            })
            .then(() => {
              console.log(attendeesListAndDetails)
              // TODO: Handle error and success! --> Probably do not need to because it is automatically after a seminar is updated
              sendEmail(attendeesListAndDetails).then(() => {
                console.log('success')
              })
                .catch(() => console.log('Fail'))
            })
        })
      })
  }
}
