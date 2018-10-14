import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

export default class MyTimePicker extends Component {
  static defaultProps = {
    placeholder: 'select time',
    format: 'HH:mm'
  }

  render () {
    const { placeholder, time, format, onDateChange, minDate, disabled } = this.props
    const minTime = moment().format(format)
    return (
      <DatePicker
        style={{ width: 200 }}
        date={time}
        mode='time'
        placeholder={placeholder}
        format={format}
        minDate={minTime || minDate}
        disabled={disabled}
        // Will need to set this to current date
        confirmBtnText='Confirm'
        minuteInterval={30}
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
