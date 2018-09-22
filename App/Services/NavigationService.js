import { NavigationActions } from 'react-navigation'

function navigate (routeName, params) {
  return (
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function push (routeName, params) {
  return (
    NavigationActions.push({
      routeName,
      params
    })
  )
}

function goBack () {
  return (
    NavigationActions.pop()
  )
}

export default {
  navigate,
  push,
  goBack
}
