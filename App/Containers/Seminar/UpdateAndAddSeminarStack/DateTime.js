import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import RoundedButton from '../../../Components/RoundedButton'
import * as actions from '../../../Action/SeminarAction'
import MyDatePicker from '../../../Components/DatePicker'
import MyTimePicker from '../../../Components/TimePicker'
import styles from '../../Styles/ContainerStyle'
import venueData from './venueData'
import SearchDropdown from '../../../Components/SearchableDropdown'
import BackButton from '../../../Components/BackButton'

class DateTime extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true
    }
  }

  onAddPressed () {
    const { abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, organiserName, host, seminardesc } = this.props
    // The actions.
    this.props.addNewSeminar({
      abstract,
      date,
      startTime,
      endTime,
      label,
      speaker,
      venue,
      venueCapacity,
      organiserName,
      host,
      seminardesc
    })
  }

  render () {
    const { date, startTime, endTime, venue } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <BackButton onPress={() => this.props.navigation.pop()} />
        <Text style={styles.sectionText}>Choose Your Seminar Time</Text>
        <MyDatePicker date={date} onDateChange={(value) => this.props.formUpdate({ prop: 'date', value })} />
        <MyTimePicker time={startTime} placeholder='Start Time'
          onDateChange={(value) => {
            this.props.formUpdate({ prop: 'startTime', value })
            this.setState({ disabled: false })
          }} />
        <MyTimePicker disabled={this.state.disabled} minDate={startTime} time={endTime} placeholder='End Time'
          onDateChange={(value) => this.props.formUpdate({ prop: 'endTime', value })} />
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
        <RoundedButton
          text={'Add'}
          onPress={this.onAddPressed.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, host, seminardesc } = state.seminar
  return {
    abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, host, seminardesc, organiserName: state.user.user.name
  }
}

export default connect(mapStateToProps, actions)(DateTime)
