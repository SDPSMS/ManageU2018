import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

export default class MyTimePicker extends Component {
  static defaultProps = {
    placeholder: 'select time',
    format: 'HH:mm'
  }

  render () {
    const { placeholder, time, format, onDateChange, disabled } = this.props
    return (
      <DatePicker
        style={{width: 270, marginVertical: 3, alignItems: 'center', alignSelf: 'center'}}
        date={time}
        mode='time'
        placeholder={placeholder}
        format={format}
        disabled={disabled}
        // Will need to set this to current date
        confirmBtnText='Confirm'
        minuteInterval={30}
        cancelBtnText='Cancel'
        showIcon= {true}
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
