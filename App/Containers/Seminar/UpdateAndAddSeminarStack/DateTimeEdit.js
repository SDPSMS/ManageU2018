import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView } from 'react-native'
import RoundedButton from '../../../Components/RoundedButton'
import * as actions from '../../../Action/SeminarAction'
import MyDatePicker from '../../../Components/DatePicker'
import MyTimePicker from '../../../Components/TimePicker'
import styles from '../../Styles/ContainerStyle'
import venueData from './venueData'
import SearchDropdown from '../../../Components/SearchableDropdown'
import BackButton from '../../../Components/BackButton'


class DateTimeEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true
    }
  }

  onUpdatePressed() {
    const { abstract, organisername, ownername, date, startTime, endTime, label, speaker, venue, id, venueCapacity, host, seminardesc } = this.props
    let val = ''
    /* Backwards Compatibility, Stupid Code, Change this if have time, not reusable. */
    if (ownername === '') {
      val = organisername
    } else {
      val = ownername
    }
    let vnue = ''
    let venueCpct = 100
    if (venue === '') {
      vnue = 'CB07.02.025'
      venueCpct = 100
    } else {
      vnue = venue
      venueCpct = venueCapacity
    }

    this.props.sendUpdateEmailNotif(id)
    this.props.saveSeminar({ abstract, date, startTime, endTime, label, speaker, venue: vnue, id, venueCapacity: venueCpct, ownername: val, host, seminardesc })
  }

  render() {
    const { date, startTime, endTime, venue } = this.props

    return (
      <View>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
          <BackButton onPress={() => this.props.navigation.pop()} />
          <Text style={styles.sectionText}>Edit Venue</Text>

          <SearchDropdown
            data={venueData}
            label='Venue'
            value={venue}
            onItemSelect={(item) => {
              this.props.formUpdate({ prop: 'venue', value: item.name })
              this.props.formUpdate({ prop: 'venueCapacity', value: item.capacity })
            }}
            onChangeText={
              (item) => {
                this.props.formUpdate({ prop: 'venue', value: item.name })
                this.props.formUpdate({ prop: 'venueCapacity', value: item.capacity })
              }
            }
          />
        </KeyboardAvoidingView>

        <MyDatePicker date={date} onDateChange={(value) => this.props.formUpdate({ prop: 'date', value })} />

        <MyTimePicker time={startTime} placeholder='Start Time'
          onDateChange={(value) => {
            this.props.formUpdate({ prop: 'startTime', value })
            this.setState({ disabled: false })
          }} />
        <MyTimePicker disabled={this.state.disabled} minDate={startTime} time={endTime} placeholder='End Time'
          onDateChange={(value) => this.props.formUpdate({ prop: 'endTime', value })} />






        <RoundedButton
          text={'Confirm Change'}
          onPress={this.onUpdatePressed.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, ownername, host, seminardesc } = state.seminar
  const { id } = state.seminar.seminarSelected
  return {
    abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, id, host, ownername, seminardesc, organiserName: state.user.user.name
  }
}

export default connect(mapStateToProps, actions)(DateTimeEdit)
