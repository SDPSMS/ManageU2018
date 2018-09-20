import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * Button to toggle open/close the drawer.
 * @param navigation
 * @returns {*}
 */
// TODO: Change with button. (Nav drawer button.)
const drawerButton = (navigation) => {
  // TODO: Needs redux implementation to check the type.
  // the navigation function has to be tested.
  return (
    <Icon
      name={'menu'}
      size={20}
      onPress={() => { navigation.state.index === 0 ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose') }}
      style={{marginLeft: 10, color: 'white'}}
    />
  )
}

export default drawerButton
