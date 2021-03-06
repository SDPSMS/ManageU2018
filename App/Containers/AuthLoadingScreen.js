// TODO: This is where we should show loader and set up the seminars list.

import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native'
import { loadAllSeminars, deleteOldSeminars } from '../Action/SeminarAction'
import { checkAuthenticated } from '../Action/UserAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import styles from './Styles/ContainerStyle'
import Loader from '../Components/Loader'
import SeminarItem from './Seminar/SeminarItem'

class AuthLoadingScreen extends Component {
  componentDidMount () {
    this.props.checkAuthenticated()
    this.props.loadAllSeminars()
    this.props.deleteOldSeminars()
  }

  render () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.titleText} >Welcome to ManageU</Text>
        <Text>Connecting to services...</Text>
        <Loader size='large' />
      </View>
    )
  }
}

export default connect(null, { checkAuthenticated, loadAllSeminars, deleteOldSeminars })(AuthLoadingScreen)
