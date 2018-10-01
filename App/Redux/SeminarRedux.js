const initialState = {
  seminars: [],
  seminarSelected: null,
  isLoading: false,
  message: '',
  abstract: '',
  date: '',
  time: '',
  duration: '',
  label: '',
  speaker: '',
  venue: ''
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
        time: '',
        duration: '',
        label: '',
        speaker: '',
        venue: ''
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
        time: action.payload.time,
        duration: action.payload.duration,
        label: action.payload.label,
        speaker: action.payload.speaker,
        venue: action.payload.venue,
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
        time: '',
        duration: '',
        label: '',
        speaker: '',
        venue: ''
      }

    case 'DELETE_SEMINAR':
      return {
        ...state
        // seminarSelected: null
      }
    case 'SORT_SEMINAR_DATE':
      return {
        ...state,
        seminars: action.payload,
        message: action.message
      }

    case 'SORT_SEMINAR_VENUE':
      return {
        ...state,
        seminars: action.payload,
        message: action.message
      }

    default:
      return state
  }
}
