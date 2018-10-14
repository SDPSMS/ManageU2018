import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'

export default class MyDatePicker extends Component {
  static propTypes = {
    format: PropTypes.string
  }
  static defaultProps = {
    format: 'YYYY-MM-DD'
  }

  render () {
    const { date, onDateChange, format } = this.props
    const minimumDate = moment().format(format)

    return (
      <DatePicker
        style={{ width: 200 }}
        date={date}
        mode='date'
        placeholder='Select Date'
        format={format}
        // Will need to set this to current date
        minDate={minimumDate}
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }

        }}
        onDateChange={onDateChange}
      />
    )
  }
}
