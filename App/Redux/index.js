import { combineReducers } from 'redux'
import configureStore from './CreateStore'

import seminar from './SeminarRedux'
import user from './UserRedux'
import attendee from './AttendeeRedux'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  seminar,
  user,
  attendee
})

export default () => {
  let { store } = configureStore(reducers)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
