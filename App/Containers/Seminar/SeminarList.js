import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { sortSeminarByDate, sortSeminarByVenue } from '../../Action/SeminarAction'
import styles from '../Styles/ContainerStyle'
import SeminarItem from './SeminarItem'
import RoundedButton from '../../Components/RoundedButton'
import CustomDropdown from '../../Components/Dropdown'
import venueData from './UpdateAndAddSeminarStack/venueData'
import ConvertToObject from '../../Transforms/ConvertToArrayOfObject'
import AlertText from '../../Components/AlertText'

class SeminarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      venue: ''
    }
  }

  renderLoad () {
    const dataObj = ConvertToObject(venueData)
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <RoundedButton text='Sort Seminar By Date' onPress={() => this.props.sortSeminarByDate()} />
          <CustomDropdown label='Venue List' data={dataObj} onChangeText={(venue) => this.setState({venue})} />
          <RoundedButton text='Sort Seminar By Venue' onPress={() => this.props.sortSeminarByVenue(this.state.venue)} />
          <View>
            <Text style={styles.titleText}>Seminars List</Text>
            <FlatList
              data={this.props.seminarsList}
              renderItem={
                ({item}) =>
                  <SeminarItem seminar={item} />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <AlertText>
              {this.props.message}
            </AlertText>
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
    seminarsList: seminar,
    message: state.seminar.message
  }
}

export default connect(mapStateToProps, {sortSeminarByDate, sortSeminarByVenue})(SeminarList)
