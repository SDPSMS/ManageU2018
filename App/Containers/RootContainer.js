import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/RootContainerStyles'
import colours from '../Themes/Colors'
import { initializeFirebase } from '../Services/FirebaseConfig'

class RootContainer extends Component {
  componentWillMount () {
    initializeFirebase()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' backgroundColor={colours.darkPrimaryColour} />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(RootContainer)
