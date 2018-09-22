import firebase from 'firebase'
import NavigationActions from '../Services/NavigationService'
import * as NavPath from '../Navigation/NavigationPath'

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
        console.log(snapshot.val())
        dispatch({ type: 'LOAD_ALL_SEMINAR', payload: snapshot.val() })
      })
  }
}

export function selectSeminar (seminarId) {
  return (dispatch) => {
    dispatch({ type: 'SELECTED_SEMINAR', payload: seminarId })
    // dispatch(NavigationActions.navigate(NavPath.LOGIN))
  }
}
