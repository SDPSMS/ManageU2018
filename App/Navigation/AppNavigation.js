import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation'
import SeminarList from '../Containers/SeminarList'

import * as NavPath from './NavigationPath'

import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import DrawerButton from '../Components/DrawerButton'
import Logout from "../Containers/Logout";

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

const LoggedOutDrawerNav = DrawerNavigator({
  SeminarList: {
    screen: SeminarList,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  AuthStack: {
    screen: AuthenticationStack,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login'
    }
  }
}, {
  gesturesEnabled: false
})

const LoggedOutNav = StackNavigator(
  {
    LoggedOutNav: {screen: LoggedOutDrawerNav}
  }, {
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#6495ed'},
      gesturesEnabled: false,
      // TODO: Gives styling to ManageU Text here.
      title: 'ManageU',
      headerLeft: DrawerButton(navigation)
    })
  })

const LoggedInDrawerNav = DrawerNavigator(
  {
    Home: {
      screen: SeminarList,
      navigationOptions: {
        title: 'Home LoggedIn',
        drawerLabel: 'Home LoggedIn'
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: 'Logout'
      }
    },

  })

const LoggedInNav = StackNavigator(
  {
    //TODO: Drawer Change in here instead of creating two nav.
    LoggedInNav: {screen: LoggedInDrawerNav},
  }, {
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#6495ed'},
      title: 'ManageU',
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    })
  })



const RootNavigation = (signedIn) => {
  return SwitchNavigator(
    {
      LoggedInNavigation: {screen: LoggedInNav},
      LoggedOutNavigation: {screen: LoggedOutNav},
    },
    {
      initialRouteName: signedIn ? 'LoggedInNavigation' : 'LoggedOutNavigation'
    }
  )
}

export default LoggedOutNav
