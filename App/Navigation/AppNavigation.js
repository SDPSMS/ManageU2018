import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import Login from '../Containers/Login'
import RegisterInit from '../Containers/RegisterInit'
import DrawerButton from '../Components/DrawerButton'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import Register from '../Containers/Register'
import Help from '../Containers/Help'
import OrganiserHome from './OrganiserNavigation'
import AdminNavigation from './AdminNavigation'
import AttendeeList from '../Containers/Attendees/AttendeeList'

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
    SeminarAttendeesView: {
      screen: AttendeeList
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

const rootNavigation = SwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    RootAdminNavigation: { screen: AdminNavigation },
    RootOrganiserNavigation: { screen: OrganiserHome },
    RootLoggedOutNavigation: { screen: LoggedOutNav }
  },
  {
    initialRouteName: 'AuthLoading'
  })

export default rootNavigation
