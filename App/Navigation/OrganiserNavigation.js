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

export default OrganiserHomeNav
