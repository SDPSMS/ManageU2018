import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import RoundedButton from '../../../Components/RoundedButton'
import * as actions from '../../../Action/SeminarAction'
import MyDatePicker from '../../../Components/DatePicker'
import MyTimePicker from '../../../Components/TimePicker'
import styles from '../../Styles/ContainerStyle'

class DateTimeEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true
    }
  }

  onUpdatePressed () {
    const { abstract, organisername, ownername, date, startTime, endTime, label, speaker, venue, id, venueCapacity } = this.props
    let val = ''
    if (ownername === '') {
      val = organisername
    } else {
      val = ownername
    }
    this.props.sendUpdateEmailNotif(id)
    this.props.saveSeminar({ abstract, date, startTime, endTime, label, speaker, venue, id, venueCapacity, ownername: val })
  }

  render () {
    const { date, startTime, endTime } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={styles.sectionText}>Change Seminar Time</Text>
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
  const { abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, ownername } = state.seminar
  const { id } = state.seminar.seminarSelected
  return {
    abstract, date, startTime, endTime, label, speaker, venue, venueCapacity, id, ownername, organiserName: state.user.user.name
  }
}

export default connect(mapStateToProps, actions)(DateTimeEdit)
