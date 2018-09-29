const initialState = {
  seminarAttendees: [],
  isLoading: false
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

    default:
      return state
  }
}
