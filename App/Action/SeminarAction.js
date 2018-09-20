import firebase from 'firebase';

function loadSeminarStart () {
  return {
    type: 'LOAD_SEMINAR_START',
  };
}

export function loadAllSeminars () {
  return (dispatch) => {
    dispatch(loadSeminarStart());

    firebase.database().ref('seminars/')
      .on('value', (snapshot) => {
        dispatch({type: 'LOAD_ALL_SEMINAR', payload: snapshot.val()});
      });
  };
}
