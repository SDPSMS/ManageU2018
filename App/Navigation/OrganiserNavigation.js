import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'
import SeminarList from '../Containers/Seminar/SeminarList'

import SeminarItem from '../Containers/Seminar/SeminarItem'
import SeminarDetails from '../Containers/Seminar/SeminarDetails'
import EditSeminar from '../Containers/Seminar/UpdateAndAddSeminarStack/EditSeminar'
import Print from '../Containers/Print'

import { MySeminarComponent } from '../Containers/'

// Refactor EDITSEMINAR TO USE THIS AS WELL.
import Abstract from '../Containers/Seminar/UpdateAndAddSeminarStack/Abstract'
import DateTime from '../Containers/Seminar/UpdateAndAddSeminarStack/DateTime'
import AttendeeList from '../Containers/Attendees/AttendeeList'
import Logout from '../Containers/Logout'
import Help from '../Containers/Help'
import DrawerButton from '../Components/DrawerButton'

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
    EditSeminar: {
      screen: EditSeminar
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
    EditSeminar: {
      screen: EditSeminar
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
    // TODO: Drawer Change in here instead of creating two nav.
    OrganiserNav: { screen: OrganiserNav }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#6495ed' },
      title: 'ManageU',
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    })
  })

export default OrganiserRootNav
