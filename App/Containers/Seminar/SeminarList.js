import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  sortSeminarByDate,
  sortSeminarByVenue,
  getSeminarBySpeaker,
  getSeminarByOrganiserName,
  startAddSeminar
} from '../../Action/SeminarAction'
import styles from '../Styles/ContainerStyle'
import SeminarItem from './SeminarItem'
import RoundedButton from '../../Components/RoundedButton'
import venueData from './UpdateAndAddSeminarStack/venueData'
import MessageText from '../../Components/MessageText'
import TextField from '../../Components/TextField'
import ModalDialog from '../../Components/ModalDialog'
import * as types from '../../Types/userType'
import MyDatePicker from '../../Components/DatePicker'
import moment from 'moment'
import SearchDropdown from '../../Components/SearchableDropdown'

class SeminarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      venue: '',
      search: '',
      showFilterModal: false,
      startDate: moment().format('L'),
      // Adding a day today.
      endDate: moment().add('1', 'days').format('L'),
      speaker: '',
      organiser: ''
    }
  }

  renderAddSeminarButton () {
    const { user } = this.props
    if (user != null) {
      if (user.role === types.ORGANISER) {
        return (
          <RoundedButton text='Add Seminar' onPress={() => this.props.startAddSeminar()} />
        )
      }
    }
  }

  renderLoad () {
    const { startDate, endDate } = this.state

    let filterDialogContent = (
      <View>
        <Text text='Sort by:' />
        <MyDatePicker date={startDate} onDateChange={(startDate) => this.setState({ startDate })} />
        <MyDatePicker date={endDate} onDateChange={(endDate) => this.setState({ endDate })} />
        <RoundedButton text='Sort Seminar By Date' onPress={() => this.props.sortSeminarByDate(startDate, endDate)} />
        <SearchDropdown
          data={venueData}
          label='Venue List'
          value={this.state.venue}
          onItemSelect={(item) => {
            this.setState({ venue: item.name })
          }}
          onChangeText={
            (venue) => {
              this.setState({ venue })
            }
          }
        />
        <RoundedButton text='Sort Seminar By Venue' onPress={() => this.props.sortSeminarByVenue(this.state.venue)} />
        <TextField placeholder='Search By Speaker' value={this.state.speaker}
          onChangeText={(speaker) => this.setState({ speaker })} />
        <RoundedButton text='Get Seminar By Speaker'
          onPress={() => this.props.getSeminarBySpeaker(this.state.speaker)} />
        <TextField placeholder='Search By Organiser Name' value={this.state.organiser}
          onChangeText={(organiser) => this.setState({ organiser })} />
        <RoundedButton text='Get Seminar By Organiser Name'
          onPress={() => this.props.getSeminarByOrganiserName(this.state.organiser)} />
      </View>
    )

    const style = {
      flex: 1
    }

    return (
      <View style={[styles.container, style]}>
        {/* Filter area, it does not scroll */}
        <View>
          <TextField placeholder='  SEARCH HERE!' value={this.state.search}
                   onChangeText={(email) => this.setState({email})} />
          <RoundedButton text='Filter' onPress={() => this.setState({showFilterModal: true})} />
        </View>

        {/* Modal diaglog for setting filters */}
        <ModalDialog
          // onPressPositive={() => this.attendSeminar()}
          onPressNegative={() => this.setState({ showFilterModal: false })} children={filterDialogContent}
          title='Filters' isVisible={this.state.showFilterModal} />
        <Text />
        <Text />
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

export default connect(mapStateToProps, {
  sortSeminarByDate,
  sortSeminarByVenue,
  getSeminarBySpeaker,
  getSeminarByOrganiserName,
  startAddSeminar
})(SeminarList)
