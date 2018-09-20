import { combineReducers } from 'redux'
import configureStore from './CreateStore'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
})

export default () => {
  let { store } = configureStore(reducers)

  if (module.hot) {
  }

  return store
}
