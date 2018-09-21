// Move firebase on to another folder.
import firebase from 'firebase'
import NavigationActions from '../Services/NavigationService'

function startAuthentication () {
  return {
    type: 'START_LOADING'
  }
}

function loginSuccess () {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

function loginError () {
  return {
    type: 'LOGIN_ERROR',
    message: 'Incorrect email and password'
  }
}

function logoutSuccess () {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

function logoutError () {
  return {
    type: 'LOGOUT_ERROR'
  }
}

function loadUserStart () {
  return {
    type: 'FETCH_USER_START'
  }
}

/**
 * Action dispatcher for login
 * @param email user email
 * @param password user password
 * @returns {Function}
 */
export function login (email, password) {
  return (dispatch) => {
    dispatch(startAuthentication())

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loginSuccess())
      })
      .catch(() => dispatch(loginError()))
  }
}

// TODO: Make register function.

export function logout () {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch(logoutSuccess())
        dispatch(NavigationActions.navigate('LoggedOutNav'))
      })
      // TODO: Change the catch
      .catch(dispatch(logoutError()))
  }
}

function viewSeminar () {
  return {
    type: 'VIEW_SEMINAR'
  }
}

// TODO: Check user type function (Call this after logged in or registered)
export function checkUserType () {
  // get user type instance from users database entity
}

// TODO: Need to check everytime updated as well, maybe we can do onChildChanged or onChildAdded.
export function fetchMySeminar () {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    dispatch(viewSeminar())
    // TODO: If we do this here now, we will have to update two entities when updating it.
    firebase.database().ref('seminars').orderByChild('ownerid').equalTo(currentUser.uid)
      .on('value', (snapshot) => {
        dispatch({ type: 'LOAD_MY_SEMINAR', payload: snapshot.val() })
      })
  }
}

// TODO: Use this but can't directly use this in app.js.
export function checkAuthenticated () {
  return (dispatch) => {
    dispatch(startAuthentication())
    firebase.auth().onAuthStateChanged((user) => {
      dispatch({ type: 'CHECK_AUTHENTICATED', payload: user })
      console.log(NavigationActions)
      if (user != null) {
        // TODO: Dispatching the navigations here might not be right.
        dispatch(NavigationActions.navigate('RootLoggedInNavigation'))
      } else {
        dispatch(NavigationActions.navigate('RootLoggedOutNavigation'))
      }
    })
  }
}

// Load all user except admin
export function loadAllUser () {
  return (dispatch) => {
    dispatch(loadUserStart())
    let users = []
    firebase.database().ref('users').once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().role !== 'Admin') {
            users.push(childSnapshot.val())
          }
        })
      })
      .then(() => dispatch({ type: 'FETCH_USERS_LIST', payload: users }))
  }
}

export function startEditNewUser () {
  return (dispatch) => {
    dispatch({ type: 'START_ADD_NEW_USER' })
    NavigationService.navigate('AddUser')
  }
}

export function addNewUser (email, name, role) {
  return (dispatch) => {
    firebase.database().ref('users').push({
      email, name, role
    }).then(() => {
      dispatch({ type: 'ADD_NEW_USER', payload: { email, name, role } })
    }).then(() => {
      NavigationService.navigate('UsersList')
    }).catch(() => console.log('Failed!'))
  }
}
