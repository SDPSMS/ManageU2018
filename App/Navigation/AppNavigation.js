import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import Login from '../Containers/Login'
import RegisterInit from '../Containers/RegisterInit'
import DrawerButton from '../Components/DrawerButton'
import Logout from '../Containers/Logout'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import EditSeminar from '../Containers/Seminar/UpdateAndAddSeminarStack/EditSeminar'
import Register from '../Containers/Register'
import Help from '../Containers/Help'
import OrganiserHome from './OrganiserNavigation'
import Abstract from '../Containers/Seminar/UpdateAndAddSeminarStack/Abstract'
import DateTime from '../Containers/Seminar/UpdateAndAddSeminarStack/DateTime'
import Print from '../Containers/Print'

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

const AddSeminarStack = StackNavigator(
  {
    Abstract: {
      screen: Abstract
    },
    DateTime: {
      screen: DateTime
    }
  },
  {
    initialRouteName: 'Abstract',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

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
    },
    Print: {
      screen: Print
    }
  },
  {
    initialRouteName: 'Home'
  })

const LoggedInNav = StackNavigator(
  {
    // TODO: Drawer Change in here instead of creating two nav.
    LoggedInNav: { screen: LoggedInDrawerNav },
    AddSeminar: { screen: AddSeminarStack }
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

export default rootNavigation
