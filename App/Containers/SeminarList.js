import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native'
// import { loadAllSeminars } from '../actions/seminar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import styles from './Styles/ContainerStyle'
import { Images } from '../Themes'

export default class SeminarList extends Component {
  componentDidMount () {
    // this.props.loadAllSeminars()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.sectionText}>Seminars List</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

// SeminarList.propTypes = {
//   seminar: PropTypes.array,
//   loadAllSeminars: PropTypes.func.isRequired,
// }
//
// function mapStateToProps (state) {
//   const seminar = _.map(state.seminar.seminars, (val, uid) => {
//     return {
//       ...val,
//       uid
//     }
//   })
//   return {
//     seminar,
//   }
// }

// export default connect(mapStateToProps, {loadAllSeminars})(SeminarList)
