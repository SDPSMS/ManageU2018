import * as types from '../Types/actionType'
import ConvertTimestampToDate from '../Transforms/ConvertTimestampToDate'

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
  host: '',
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
        message: '',
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

    case types.START_ADD_SEMINAR:
      return {
        ...state,
        message: '',
        abstract: '',
        date: '',
        endTime: '',
        startTime: '',
        label: '',
        speaker: '',
        venue: '',
        venueCapacity: '',
        host: ''
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
        host: '',
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
        startTime: ConvertTimestampToDate(action.payload.startDate, 'HH:mm'),
        endTime: ConvertTimestampToDate(action.payload.endDate, 'HH:mm'),
        date: ConvertTimestampToDate(action.payload.startDate, 'YYYY-MM-DD'),
        label: action.payload.label,
        speaker: action.payload.speaker,
        venue: action.payload.venue,
        venueCapacity: action.payload.venueCapacity,
        id: action.payload.id,
        host: action.payload.host,
        ownername: action.payload.ownername
        // seminarSelected: null,
      }

    // TODO: SAVE_SEMINAR HAS SOME BUGS.
    case 'SAVE_SEMINAR':
      return {
        ...state,
        // seminarSelected: null,
        abstract: '',
        date: '',
        startTime: '',
        endTime: '',
        label: '',
        speaker: '',
        venue: '',
        venueCapacity: '',
        ownername: '',
        host: '',
        seminars: state.seminars.map((item) => (
          item.id === action.payload.id ? {
            ...item,
            abstract: action.payload.abstract,
            endDate: action.payload.endDate,
            label: action.payload.label,
            speaker: action.payload.speaker,
            startDate: action.payload.startDate,
            venue: action.payload.venue,
            venueCapacity: action.payload.venueCapacity,
            ownername: action.payload.ownername,
            host: action.payload.host
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
