import * as types from '../Types/actionType'

const initialState = {
  seminars: [],
  seminarSelected: null,
  isLoading: false,
  message: '',
  abstract: '',
  date: '',
  endTime: '',
  startTime: '',
  label: '',
  speaker: '',
  venue: '',
  venueCapacity: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_SEMINAR_START':
      return {
        ...state,
        isLoading: true
      }

    case 'LOAD_ALL_SEMINAR':
      return {
        ...state,
        isLoading: false,
        seminars: action.payload
      }

    case 'SELECTED_SEMINAR':
      return {
        // ES6 Syntax, merging the state with the rest.
        ...state,
        // the payload refer to the actions, the selectedid in SELECTED_SEMINAR action.
        seminarSelected: action.payload
      }

    case 'NONE_SELECTED':
      return {
        ...state
      }

    case 'ADD_SEMINAR':
      return {
        ...state,
        // after finish reset all the current state.
        abstract: '',
        date: '',
        startTime: '',
        endTime: '',
        label: '',
        speaker: '',
        venue: '',
        venueCapacity: '',
        // TODO: And then reorder?
        seminars: [...state.seminars, action.payload]
      }

    case 'FORM_UPDATE':
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      }

    case 'VIEW_SEMINAR':
      return {
        ...state
      }

    // TODO: EDIT AND ADD CAN BE COUPLED UP?
    case 'EDIT_SEMINAR':
      return {
        ...state,
        abstract: action.payload.abstract,
        date: action.payload.date,
        endTime: action.payload.endTime,
        startTime: action.payload.startTime,
        label: action.payload.label,
        speaker: action.payload.speaker,
        venue: action.payload.venue,
        venueCapacity: action.payload.venueCapacity,
        id: action.payload.id
        // seminarSelected: null,
      }

    // TODO: SAVE_SEMINAR HAS SOME BUGS.
    case 'SAVE_SEMINAR':
      return {
        ...state,
        // TODO: Should change seminarSelected: null,
        // seminarSelected: null,
        abstract: '',
        date: '',
        startTime: '',
        endTime: '',
        label: '',
        speaker: '',
        venue: '',
        venueCapacity: '',
        seminars: state.seminars.map((item) => (
          item.id === action.payload.id ? {
            ...item,
            abstract: action.payload.abstract,
            endDate: action.payload.endDate,
            label: action.payload.label,
            speaker: action.payload.speaker,
            startDate: action.payload.startDate,
            venue: action.payload.venue,
            venueCapacity: action.payload.venueCapacity
          } : item
        ))
      }

    case 'DELETE_SEMINAR':
      return {
        ...state,
        seminars: state.seminars.filter(item => action.payload !== item.id)
        // seminarSelected: null
      }
    case types.SORT_SEMINAR_SUCCESS:
      return {
        ...state,
        message: '',
        seminars: action.payload
      }
    case types.SORT_SEMINAR_ERROR:
      return {
        ...state,
        message: action.message,
        seminars: []
      }
    case types.SEMINAR_SAVE_FAILED:
      return {
        ...state
        // TODO: Show error? Redirect back to home and alert that there is an internal error?
      }

    default:
      return state
  }
}
