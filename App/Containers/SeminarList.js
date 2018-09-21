import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native'
import { loadAllSeminars } from '../Action/SeminarAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import styles from './Styles/ContainerStyle'
import Loader from '../Components/Loader'
import SeminarItem from './SeminarItem'

class SeminarList extends Component {
  renderLoad () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.sectionText}>Seminars List</Text>
            <FlatList
              data={this.props.seminarsList}
              renderItem={
                ({ item }) =>
                  <SeminarItem seminar={item} />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {this.renderLoad()}
      </View>
    )
  }
}

function mapStateToProps (state) {
  const seminar = _.map(state.seminar.seminars, (val, uid) => {
    return {
      ...val,
      uid
    }
  })
  return {
    seminarsList: seminar
  }
}
export default connect(mapStateToProps, null)(SeminarList)

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
