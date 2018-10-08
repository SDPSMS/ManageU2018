import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { connect } from 'react-redux'
import { View } from 'react-native'
import RoundedButton from '../../../Components/RoundedButton'
import * as actions from '../../../Action/SeminarAction'
import MyDatePicker from '../../../Components/DatePicker'
import MyTimePicker from '../../../Components/TimePicker'

class DateTime extends Component {
  onAddPressed () {
    const { abstract, date, time, duration, label, speaker, venue } = this.props
    // The actions.
    this.props.addNewSeminar({ abstract, date, time, duration, label, speaker, venue })
  }

  render () {
    const { date, time, duration } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <TextField
          placeholder={'Date'}
          value={date}
          onChangeText={(value) => this.props.formUpdate({ prop: 'date', value })}
        />
        <TextField
          placeholder={'Time'}
          value={time}
          onChangeText={(value) => this.props.formUpdate({ prop: 'time', value })}
        />
        <TextField
          placeholder={'Duration'}
          value={duration}
          onChangeText={(value) => this.props.formUpdate({ prop: 'duration', value })}
        />
        <MyDatePicker>
        </MyDatePicker>

        <MyTimePicker>

        </MyTimePicker>
        
        <RoundedButton
          text={'Add'}
          onPress={this.onAddPressed.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, time, duration, label, speaker, venue } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue
  }
}

export default connect(mapStateToProps, actions)(DateTime)
