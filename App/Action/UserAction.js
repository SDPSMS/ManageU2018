// Move firebase on to another folder.
import API from '../Services/Api'
import firebase from 'firebase'
import NavigationActions from '../Services/NavigationService'
import * as types from '../Types/actionType'
import * as userTypes from '../Types/userType'
import moment from 'moment'

function startAuthentication () {
  return {
    type: 'START_LOADING'
  }
}

function loginSuccess (user) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user
  }
}

function loginError () {
  return {
    type: 'LOGIN_ERROR',
    message: 'Incorrect email and password'
  }
}

function registerError () {
  return {
    type: 'REGISTER_ERROR',
    message: 'Account with this email already exists'
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

function registerSuccess (user) {
  return {
    type: 'REGISTER_SUCCESS',
    payload: user
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
      .then((user) => {
        firebase.database().ref(`users/${user.user.uid}`).on('value', (snapshot) => {
          dispatch(loginSuccess(snapshot.val()))
        })
      })
      .catch(() => dispatch(loginError()))
  }
}

export function saveUserToDatabase (email, uid, name, role) {
  return (dispatch) => {
    firebase.database().child(`users/${uid}`).set({ email, name, role }).then(() => console.log(email))
  }
}

// TODO: Make register function.
export function register (email, name, password, role) {
  return (dispatch) => {
    dispatch(startAuthentication())
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const newUser = { email, name, role, id: user.user.uid }
        firebase.database().ref(`users/${user.user.uid}`).set(newUser).then(() => {
          dispatch(NavigationActions.navigate('RootLoggedInNavigation'))
          dispatch(registerSuccess(newUser))
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch(registerError())
      })
  }
  // TODO: Handle catch error
}

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
      if (user != null) {
        dispatch(fetchMySeminar())
        firebase.database().ref(`users/${user.uid}`).on('value', (snapshot) => {
          dispatch({ type: 'CHECK_AUTHENTICATED', payload: snapshot.val() })
          if (snapshot.val() != null && snapshot.val().role === userTypes.ORGANISER) {
            dispatch(NavigationActions.navigate('RootOrganiserNavigation'))
          } else if (snapshot.val() != null && snapshot.val().role === userTypes.ADMIN) {
            dispatch(NavigationActions.navigate('RootAdminNavigation'))
          } else {
            dispatch(NavigationActions.navigate('RootLoggedOutNavigation'))
          }
        })
      } else {
        dispatch({ type: 'CHECK_AUTHENTICATED', payload: null })
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
            const id = childSnapshot.key
            const value = childSnapshot.val()
            const user = { id, ...value }

            users.push(user)
          }
        })
      })
      .then(() => dispatch({ type: 'FETCH_USERS_LIST', payload: users }))
  }
}

export function addNewUser (email, name, role) {
  return (dispatch) => {
    dispatch({ type: 'ADD_USER_START' })
    if (email === '' || name === '' || role === '') {
      dispatch({ type: types.FORM_USER_FAILED, message: 'Please do not leave any empty fields' })
    } else {
      const usersRef = firebase.database().ref('users').push()
      firebase.database().ref(`users/${usersRef.getKey()}`).set({ id: usersRef.getKey(), email, name, role })
        .then(() => {
          dispatch({ type: 'ADD_NEW_USER', payload: { email, name, role } })
        }).then(() => {
          dispatch(NavigationActions.navigate('UsersList'))
        }).catch(() => console.log('Failed!'))
    }
  }
}

export function selectUser (userId) {
  return (dispatch) => {
    dispatch({ type: 'USER_SELECTED', payload: userId })
    dispatch(NavigationActions.push('EditUser'))
  }
}

export function saveUser ({ id, name, email, role }) {
  return (dispatch) => {
    if (name !== '') {
      firebase.database().ref(`users/${id}`)
        .set({ id, name, email, role })
        .then(() => {
          // SAVE USER IN THE DATABASE
          dispatch({ type: 'SAVE_USER', payload: { name, role } })
          // Navigate because we want to retrieve data directly again.
          // TODO: Instead of navigate, maybe we can update the state instead?
          dispatch(NavigationActions.navigate('UsersList'))
        })
    } else {
      dispatch({ type: types.FORM_USER_FAILED, message: 'Please do not leave any empty fields' })
    }
  }
}

export function deleteUser (userId) {
  return (dispatch) => {
    firebase.database().ref(`users/${userId}`)
      .remove()
      .then(() => {
        dispatch({ type: types.DELETE_USER_SUCCESS, payload: userId })
        // after remove, we dispatch the actions so that the redux state can be updated.
      })
  }
}

function checkStaffsDatabaseForRegister (email, password) {
  return API.create().checkStaffDatabaseForRegister(email, password)
}

function registerInitStart () {
  return {
    type: types.REGISTER_CHECK_DATABASE_START
  }
}

export function registerInitialisation (email, password) {
  return (dispatch) => {
    dispatch(registerInitStart())
    checkStaffsDatabaseForRegister(email, password)
      .then((response) => {
        if (response.ok) {
          dispatch({ type: types.REGISTER_CHECK_DATABASE_SUCCESS })
          dispatch(NavigationActions.push('Register'))
        } else {
          dispatch({ type: types.REGISTER_CHECK_DATABASE_FAILED, message: 'Incorrect UTS Staff Email or Password' })
        }
      })
  }
}
