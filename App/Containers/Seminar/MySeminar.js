import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { fetchMySeminar } from '../../Action/UserAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import SeminarItem from './SeminarItem'
import RoundedButton from '../../Components/RoundedButton'
import * as types from '../../Types/userType'
import styles from '../Styles/ContainerStyle'

/**
 * Display the lists owned by a seminar hosts.
 */
class MySeminar extends Component {
  componentDidMount () {
    this.props.fetchMySeminar()
  }
  renderAddSeminarButton () {
    const { user } = this.props
    if (user != null) {
      if (user.role === types.ORGANISER) {
        return (
          <RoundedButton text='Add Seminar' onPress={() => this.props.navigation.navigate('AddSeminar')} />
        )
      }
    }
  }

  renderInitialView () {
    return (
      // Return the list view
      <View style={styles.container}>
        <Text style={styles.sectionText}> My Seminars</Text>
        <FlatList
          data={this.props.mySeminar}
          renderItem={
            ({ item }) =>
              <SeminarItem seminar={item} />
          }
          keyExtractor={(item, index) => index.toString()}
        />
        {this.renderAddSeminarButton()}
      </View>
    )
  }

  render () {
    return (
      <View>
        {this.renderInitialView()}
      </View>
    )
  }
}

MySeminar.propTypes = {
  mySeminar: PropTypes.array,
  fetchMySeminar: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const mySeminar = _.map(state.user.myseminar, (val, uid) => {
    return {
      ...val,
      uid
    }
  })
  return {
    mySeminar
  }
}

const MySeminarComponent = connect(mapStateToProps, { fetchMySeminar })(MySeminar)
export { MySeminarComponent }
