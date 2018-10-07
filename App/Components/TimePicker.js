import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
 
export default class MyTimePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"00:00"}
  }
 
  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.time}
        
        mode="time"
        placeholder="select time"
        format="HH:mm"
        // Will need to set this to current date
        confirmBtnText="Confirm"
        minuteInterval={30}
        cancelBtnText="Cancel"
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
        onDateChange={(time) => {this.setState({time: time})}}
      />
    )
  }
}