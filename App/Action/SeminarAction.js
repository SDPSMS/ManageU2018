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
    dispatch({type: 'NONE_SELECTED'})
  };
}

export function editSeminar(seminar) {
  return {
    type: 'EDIT_SEMINAR',
    payload: seminar,
  };
}

export function deleteSeminar(seminarId) {
  return (dispatch) => {
    firebase.database().ref(`seminars/${seminarId}`)
      .remove()
      .then(() => {
        //after remove, we dispatch the actions so that the redux state can be updated.
        dispatch({type: 'DELETE_SEMINAR'});
        dispatch(NavigationActions.navigate('SeminarList'))
      });
  }
}
