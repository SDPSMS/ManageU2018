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
import MessageText from '../../Components/MessageText'
import TextField from '../../Components/TextField'
import ModalDialog from '../../Components/ModalDialog'
import * as types from '../../Types/userType'

class SeminarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      venue: '',
      search: '',
      showFilterModal: false
    }
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

  renderLoad () {
    const dataObj = ConvertToObject(venueData)

    let filterDialogContent = (
      <View>
        <Text text='Sort by:' />
        <RoundedButton text='Sort Seminar By Date' onPress={() => this.props.sortSeminarByDate()} />
        <CustomDropdown label='Venue List' data={dataObj} onChangeText={(venue) => this.setState({ venue })} />
        <RoundedButton text='Sort Seminar By Venue' onPress={() => this.props.sortSeminarByVenue(this.state.venue)} />
      </View>
    )

    return (
      <View style={styles.container}>
        {/* Filter area, it does not scroll */}
        <TextField placeholder='Search seminars...' value={this.state.search} onChangeText={(email) => this.setState({ email })} />
        <RoundedButton text='Filter' onPress={() => this.setState({ showFilterModal: true })} />
        <Text style={styles.titleText}>Seminars List</Text>

        {/* Modal diaglog for setting filters */}
        <ModalDialog
          // onPressPositive={() => this.attendSeminar()}
          onPressNegative={() => this.setState({ showFilterModal: false })} children={filterDialogContent}
          title='Filters' isVisible={this.state.showFilterModal} />

        <ScrollView style={styles.container}>
          <View>
            <FlatList
              data={this.props.seminarsList}
              renderItem={
                ({ item }) =>
                  <SeminarItem seminar={item} />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <MessageText>
              {this.props.message}
            </MessageText>
          </View>
        </ScrollView>
        {this.renderAddSeminarButton()}
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
    message: state.seminar.message,
    user: state.user.user
  }
}

export default connect(mapStateToProps, { sortSeminarByDate, sortSeminarByVenue })(SeminarList)
