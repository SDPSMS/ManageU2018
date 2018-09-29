import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import Login from '../Containers/Login'
import Register from '../Containers/Register'
import DrawerButton from '../Components/DrawerButton'
import Logout from '../Containers/Logout'

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import UserList from '../Containers/User/UserList'
import AddUser from '../Containers/User/AddUser'
import EditUser from '../Containers/User/EditUser'
import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import EditSeminar from '../Containers/Seminar/EditSeminar'
import ShowFaces from '../Containers/ShowFaces'

import { MySeminarComponent } from '../Containers/'
import AddSeminar from '../Containers/Seminar/AddSeminar'

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
    // TODO: Attendee should not be able to edit seminar.
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

// ADMIN ONLY LOGGED IN UTILITY
// TODO: Only show this if user role when logged in is checked as admin.
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
      headerVisible: false
    }
  }
)

// TODO: Check user type, if they are seminar host, then make them see their seminars list, if they are admin, they should see users list.
// TODO: We probably need to refactor this, because an admin or an organiser might not even need to see a seminar list at all
const LoggedInDrawerNav = DrawerNavigator(
  {
    Home: {
      screen: SeminarStack,
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
    },
    AddSeminar: {
      screen: AddSeminar,
      navigationOptions: {
        drawerLabel: 'Add Seminar'
      }
    },
    MySeminar: {
      screen: MySeminarComponent,
      navigationOptions: {
        drawerLabel: 'My Seminar'
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
    RootLoggedOutNavigation: { screen: LoggedOutNav },
    ShowFaces: { screen: ShowFaces },
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
