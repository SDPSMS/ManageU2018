import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import UserList from '../Containers/User/UserList'
import AddUser from '../Containers/User/AddUser'
import EditUser from '../Containers/User/EditUser'
import OrganiserHome from './OrganiserNavigation'
import Logout from '../Containers/Logout'
import Help from '../Containers/Help'
import Print from '../Containers/Print'
import DrawerButton from '../Components/DrawerButton'
import Colours from '../Themes/Colors'

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

const AdminNav = DrawerNavigator(
  {
    Home: {
      screen: UserManagementStack,
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

const AdminRootNav = StackNavigator(
  {
    // TODO: Drawer Change in here instead of creating two nav.
    AdminNav: { screen: AdminNav }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: Colours.defaultPrimaryColour },
      title: 'ManageU',
      headerTintColor: Colours.textPrimaryColour ,
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    })
  })

export default AdminRootNav
