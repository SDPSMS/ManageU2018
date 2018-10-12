import * as types from '../Types/actionType'

const initialState = {
  seminarAttendees: [],
  isLoading: false,
  message: '',
  showModal: false,
  name: '',
  email: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ATTENDEE_LISTS':
      return {
        ...state,
        seminarAttendees: action.payload,
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
        isLoading: false
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
        showModal: false
      }

    case 'EDIT_ATTENDEE_SUCCESS':
      return {
        ...state,
        showModal: false
      }

    case types.OPEN_MODAL:
      return {
        ...state,
        showModal: true
      }

    default:
      return state
  }
}
