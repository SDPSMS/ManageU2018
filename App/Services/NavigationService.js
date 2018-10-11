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

function replace (routeName) {
  return (
    NavigationActions.replace({
      routeName
    })
  )
}

export default {
  navigate,
  push,
  goBack,
  replace
}
