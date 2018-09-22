import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import * as NavPath from './NavigationPath'

import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import DrawerButton from '../Components/DrawerButton'
import Logout from '../Containers/Logout'

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import UserList from '../Containers/User/UserList'
import AddUser from '../Containers/User/AddUser'
import EditUser from '../Containers/User/EditUser'

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

//ADMIN ONLY LOGGED IN UTILITY
//TODO: Only show this if user role when logged in is checked as admin.
const UserManagementStack = StackNavigator(
  {
    UsersList: {
      screen: UserList,
      navigationOptions: {
        drawerLabel: 'Users List'
      }
    },
    AddUser: {
      screen: AddUser,
      navigationOptions: {
        drawerLabel: null
      }
    },
    EditUser: {
      screen: EditUser,
      navigationOptions: {
        drawerLabel: null
      }
    }
  },
  {
    initialRouteName: 'UsersList',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const LoggedInDrawerNav = DrawerNavigator(
  {
    Home: {
      screen: SeminarList,
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
    UserManagement: {
      screen: UserManagementStack,
      navigationOptions: {
        drawerLabel: 'User Management'
      }
    }


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

export default SwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    RootLoggedInNavigation: { screen: LoggedInNav },
    RootLoggedOutNavigation: { screen: LoggedOutNav }
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
