import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { sortSeminarByDate } from '../../Action/SeminarAction'
import styles from '../Styles/ContainerStyle'
import SeminarItem from './SeminarItem'
import RoundedButton from '../../Components/RoundedButton'

class SeminarList extends Component {
  renderLoad () {
    return (
      <View>
        <ScrollView style={styles.container}>
          <RoundedButton text='Sort Seminar By Date' onPress={() => this.props.sortSeminarByDate()} />
          <View>
            <Text style={styles.titleText}>Seminars List</Text>
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
export default connect(mapStateToProps, {sortSeminarByDate})(SeminarList)
