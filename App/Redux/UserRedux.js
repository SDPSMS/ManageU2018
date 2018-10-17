import * as types from '../Types/actionType'

const initialState = {
  user: null,
  error: '',
  isLoading: false,
  myseminar: [],
  // Admin only utility.
  userslist: [],
  selectedUser: null
}

/**
 * User reducer
 * @param state: the state that the reducers contains
 * @param action: the action that was dispatched from user interaction. '../actions/server.js'
 * @returns by default: {{user: null, error: string, isLoading: boolean}} //change when action is dispatched
 * https://redux.js.org/
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
        error: ''
      }

    case 'CHECK_AUTHENTICATED':
      return {
        ...state,
        user: action.payload,
        isLoading: false
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: '',
        user: action.payload
      }

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.message,
        isLoading: false
      }

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
        myseminar: [],
        selectedUser: null,
        userslist: []
      }

    case 'LOGOUT_ERROR':
      return {
        ...state
      }

    case 'REGISTER_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.message
      }

    case 'LOAD_MY_SEMINAR':
      return {
        ...state,
        myseminar: action.payload
      }

    case 'FETCH_USER_START':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_USERS_LIST':
      return {
        ...state,
        isLoading: false,
        userslist: action.payload
      }

    case 'START_ADD_NEW_USER':
      return {
        ...state,
        adminAddUserView: true
      }

    case 'SAVE_USER':
      return {
        ...state,
        userslist: state.userslist.map((item) => (
          item.id === action.payload.id ? {
            ...item,
            name: action.payload.name,
            role: action.payload.role
          } : item
        ))
      }

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        userslist: state.userslist.filter(item => action.payload !== item.id)
      }

    case 'ADD_NEW_USER':
      return {
        ...state,
        // overriding the state.
        userslist: [...state.userslist, action.payload]
      }

    case 'USER_SELECTED':
      return {
        // ES6 Syntax, merging the state with the rest.
        ...state,
        // the payload refer to the actions, the selectedid in SELECTED_USER action.
        selectedUser: action.payload,
        error: ''
      }

    case types.REGISTER_CHECK_DATABASE_START:
      return {
        ...state,
        isLoading: true,
        error: ''
      }

    case types.REGISTER_CHECK_DATABASE_FAILED:
      return {
        ...state,
        error: action.message,
        isLoading: false
      }

    case types.REGISTER_CHECK_DATABASE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      }

    case 'ADD_USER_START': {
      return {
        ...state,
        error: ''
      }
    }

    case types.FORM_USER_FAILED:
      return {
        ...state,
        error: action.message
      }

    default:
      return state
  }
}
