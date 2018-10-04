import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import Login from '../Containers/Login'
import RegisterInit from '../Containers/RegisterInit'
import DrawerButton from '../Components/DrawerButton'
import Logout from '../Containers/Logout'

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import UserList from '../Containers/User/UserList'
import AddUser from '../Containers/User/AddUser'
import EditUser from '../Containers/User/EditUser'
import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import EditSeminar from '../Containers/Seminar/UpdateAndAddSeminarStack/EditSeminar'
import Register from '../Containers/Register'
import Help from '../Containers/Help'

import AdminHome from './AdminNavigation'
import OrganiserHome from './OrganiserNavigation'

const AuthenticationStack = StackNavigator(
  {
    Login: {
      screen: Login
    },
    RegisterInit: {
      screen: RegisterInit
    },
    Register: {
      screen: Register
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

const SeminarStack = StackNavigator(
  {
    SeminarList: {
      screen: SeminarList
    },
    SeminarItem: {
      screen: SeminarItem
    },
    SeminarDetails: {
      screen: SeminarDetails
    },
    EditSeminar: {
      screen: EditSeminar
    }
  },
  {
    initialRouteName: 'SeminarList',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const LoggedOutDrawerNav = DrawerNavigator({
  SeminarList: {
    screen: SeminarStack,
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
  },
  Help: {
    screen: Help,
    navigationOptions: {
      title: 'Help',
      drawerLabel: 'Help'
    }
  }
}, {
  gesturesEnabled: false
})

const LoggedOutNav = StackNavigator(
  {
    LoggedOutNav: { screen: LoggedOutDrawerNav }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#6495ed' },
      gesturesEnabled: false,
      // TODO: Gives styling to ManageU Text here.
      title: 'ManageU',
      headerLeft: DrawerButton(navigation)
    })
  })

// TODO: Check user type, if they are seminar host, then make them see their seminars list, if they are admin, they should see users list.
// TODO: We probably need to refactor this, because an admin or an organiser might not even need to see a seminar list at all
const LoggedInDrawerNav = DrawerNavigator(
  {
    Home: {
      screen: OrganiserHome,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: 'Logout'
      }
    },
    Help: {
      screen: Help,
      navigationOptions: {
        title: 'Help',
        drawerLabel: 'Help'
      }
    }
  },
  {
    initialRouteName: 'Home'
  })

const LoggedInNav = StackNavigator(
  {
    // TODO: Drawer Change in here instead of creating two nav.
    LoggedInNav: { screen: LoggedInDrawerNav }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#6495ed' },
      title: 'ManageU',
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    })
  })

const rootNavigation = SwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    RootLoggedInNavigation: { screen: LoggedInNav },
    RootLoggedOutNavigation: { screen: LoggedOutNav }
  },
  {
    initialRouteName: 'AuthLoading'
  })

// export default SwitchNavigator(
//   {
//     AuthLoading: { screen: AuthLoadingScreen },
//     RootLoggedInNavigation: { screen: LoggedInNav },
//     RootLoggedOutNavigation: { screen: LoggedOutNav }
//   },
//   {
//     initialRouteName: 'AuthLoading'
//   }
// )

export default rootNavigation
