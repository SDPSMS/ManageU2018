import * as types from '../Types/actionType'

const initialState = {
  seminarAttendees: [],
  isLoading: false,
  message: ''
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
        isLoading: true
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
        ...state
      }

    default:
      return state
  }
}
