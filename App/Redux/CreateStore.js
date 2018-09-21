import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import ScreenTracking from './ScreenTrackingMiddleware'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
  )
  middleware.push(navigationMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */
  middleware.push(thunk)

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(...enhancers))

  // kick off root saga

  return {
    store
  }
}
