import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import Print from '../Containers/Print'

import { MySeminarComponent } from '../Containers/'

// Refactor EDITSEMINAR TO USE THIS AS WELL.
import Abstract from '../Containers/Seminar/UpdateAndAddSeminarStack/Abstract'
import DateTime from '../Containers/Seminar/UpdateAndAddSeminarStack/DateTime'
import AttendeeList from '../Containers/Attendees/AttendeeList'
import Logout from '../Containers/Logout'
import Help from '../Containers/Help'
import DrawerButton from '../Components/DrawerButton'
import AbstractEdit from '../Containers/Seminar/UpdateAndAddSeminarStack/AbstractEdit'
import DateTimeEdit from '../Containers/Seminar/UpdateAndAddSeminarStack/DateTimeEdit'
import Colours from '../Themes/Colors'

const SeminarStack = StackNavigator(
  {
    SeminarList: {
      screen: SeminarList
    },
    SeminarAttendeesView: {
      screen: AttendeeList
    },
    SeminarItem: {
      screen: SeminarItem
    },
    SeminarDetails: {
      screen: SeminarDetails
    },
    AbstractEdit: {
      screen: AbstractEdit
    },
    DateTimeEdit: {
      screen: DateTimeEdit
    },
    Abstract: {
      screen: Abstract
    },
    DateTime: {
      screen: DateTime
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

const MySeminarStack = StackNavigator(
  {
    MySeminar: {
      screen: MySeminarComponent
    },
    SeminarAttendeesView: {
      screen: AttendeeList
    },
    SeminarItem: {
      screen: SeminarItem
    },
    SeminarDetails: {
      screen: SeminarDetails
    },
    Print: {
      screen: Print
    }
  },
  {
    initialRouteName: 'MySeminar',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const OrganiserHomeNav = TabNavigator(
  {
    SeminarLists: {
      screen: SeminarStack,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
    MySeminar: {
      screen: MySeminarStack,
      navigationOptions: {
        drawerLabel: 'My Seminar'
      }
    }
  }
)

const OrganiserNav = DrawerNavigator(
  {
    Home: {
      screen: OrganiserHomeNav,
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
  }
)

const OrganiserRootNav = StackNavigator(
  {
    OrganiserNav: { screen: OrganiserNav }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: Colours.defaultPrimaryColour },
      title: 'ManageU',
      headerTintColor: Colours.textPrimaryColour,
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    })
  })

export default OrganiserRootNav
