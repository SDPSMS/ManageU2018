import { NavigationActions, StackActions } from 'react-navigation'

function navigate (routeName, params) {
  return (
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function push (routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  )
}

function goBack () {
  navigator.dispatch(
    StackActions.pop()
  )
}

export default {
  navigate,
  push,
  goBack
}
