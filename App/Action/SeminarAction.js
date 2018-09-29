import firebase from 'firebase'
import NavigationActions from '../Services/NavigationService'

function loadSeminarStart () {
  return {
    type: 'LOAD_SEMINAR_START'
  }
}

export function loadAllSeminars () {
  return (dispatch) => {
    dispatch(loadSeminarStart())

    firebase.database().ref('seminars/')
      .on('value', (snapshot) => {
        dispatch({ type: 'LOAD_ALL_SEMINAR', payload: snapshot.val() })
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
export function saveSeminar ({ abstract, date, time, duration, label, speaker, venue, uid }) {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`seminars/${uid}`)
      .set({ abstract, date, time, duration, label, speaker, venue, ownerid: currentUser.uid })
      .then(() => {
        // SAVE SEMINAR IN THE DATABASE
        dispatch({ type: 'SAVE_SEMINAR' })
        dispatch(NavigationActions.navigate('SeminarList'))
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
        dispatch({ type: 'DELETE_SEMINAR' })
        dispatch(NavigationActions.navigate('SeminarList'))
      })
  }
}

export function addNewSeminar ({ abstract, date, time, duration, label, speaker, venue }) {
  // TODO: Set the user to have the seminars / Set the seminars to have the user id.
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    // setting the current user uid (who created the seminar) as a foreign key in the seminars entity.
    firebase.database().ref('seminars')
      .push({ abstract, date, time, duration, label, speaker, venue, ownerid: currentUser.uid })
      .then(() => {
        dispatch({ type: 'ADD_SEMINAR' })
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

export function loadAttendees (seminarId) {
  return (dispatch) => {
    dispatch(loadAttendeeStart())
    let attendeesListAndDetails = []
    // orderBy equalTo
    firebase.database().ref('attendeelist').child(seminarId)
      .once('value').then((snapshot) => {
        snapshot.forEach((attendeeid) => {
          firebase.database().ref('atendees').child(attendeeid.val())
            .once('value').then((snapshot) => {
              attendeesListAndDetails.push(snapshot.val())
            })
            .then(() => {
              console.log(attendeesListAndDetails)
              dispatch({ type: 'FETCH_ATTENDEE_LISTS', payload: attendeesListAndDetails })
              dispatch(loadAttendeeFinish())
            })
        })
      })
    // .then(() => {
    //   dispatch({type: 'FETCH_ATTENDEE_LISTS', payload: attendeesListAndDetails})
    //   dispatch(loadAttendeeFinish())
    // })
  }
}
