import * as types from '../Types/actionType'
import _ from 'lodash'

const initialState = {
  seminarAttendees: [],
  selectedAttendee: null,
  isLoading: false,
  message: '',
  showModal: false,
  name: '',
  email: '',
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ATTENDEE_LISTS':
      return {
        ...state,
        seminarAttendees: action.payload,
        message: '',
        isLoading: false
      }

    case types.EMPTY_ATTENDEE:
      return {
        ...state,
        seminarAttendees: action.payload,
        message: action.message,
        isLoading: false
      }
    case 'LIST_ATTENDEE_START':
      return {
        ...state,
        isLoading: true
      }
    case types.SEMINAR_ATTEND_START:
      return {
        ...state,
        message: '',
        isLoading: true
      }

    case types.SEMINAR_ATTEND_FINISH:
      return {
        ...state,
        message: ''
      }
    case types.SEMINAR_ATTEND_ERROR:
      return {
        ...state,
        message: action.message,
        isLoading: false
      }
    case types.SEMINAR_ATTEND_SUCCESS:
      return {
        ...state,
        message: action.message,
        isLoading: false,
        seminarAttendees: [...state.seminarAttendees, action.payload]
      }
    case types.SEMINAR_ATTEND_FAILED:
      return {
        ...state,
        message: action.message,
        isLoading: false
      }

    case types.DELETE_ATTENDEE_SUCCESS:
      return {
        ...state,
        showModal: false,
        isLoading: false,
        seminarAttendees: state.seminarAttendees.filter(item => action.payload !== item.id)
      }

    case 'EDIT_ATTENDEE_START':
      return {
        ...state,
        showModal: true,
        isLoading: false,
        error: '',
        selectedAttendee: state.seminarAttendees.find(x => x.id === action.payload)
      }

    case 'DELETE_ATTENDEE_START':
      return {
        ...state,
        isLoading: false,
        showModal: true
      }

    case 'EDIT_ATTENDEE_SUCCESS':
      return {
        ...state,
        showModal: false,
        isLoading: false,
        seminarAttendees: state.seminarAttendees.map((item) => (
          item.id === action.payload.id ? {
            ...item,
            email: action.payload.email,
            name: action.payload.name,
            status: action.payload.status
          } : item
        ))
      }

    case 'EDIT_ATTENDEE_FAIL':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case 'ATTENDEE_LOADING':
      return {
        ...state,
        isLoading: true
      }

    case types.OPEN_MODAL:
      return {
        ...state,
        showModal: true
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false
      }

    default:
      return state
  }
}
