import { StackNavigator, DrawerNavigator } from 'react-navigation'
import SeminarList from '../Containers/SeminarList'

import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import DrawerButton from '../Components/DrawerButton'

const AuthenticationStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel: 'Login'
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        drawerLabel: null
      }
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const DrawerStack = DrawerNavigator({
  Home: {
    screen: SeminarList,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  Login: {
    screen: AuthenticationStack,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login'
    }
  }
}, {
  gesturesEnabled: false
})

const PrimaryNav = StackNavigator(
  {
    DrawerStack: {screen: DrawerStack}
  }, {
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#6495ed'},
      gesturesEnabled: false,
      // TODO: Gives styling to ManageU Text here.
      title: 'ManageU',
      headerLeft: DrawerButton(navigation)
    })
  })

export default PrimaryNav
