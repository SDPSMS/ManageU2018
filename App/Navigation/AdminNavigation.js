import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import UserList from '../Containers/User/UserList'
import AddUser from '../Containers/User/AddUser'
import EditUser from '../Containers/User/EditUser'

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

export default UserManagementStack
