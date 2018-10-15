import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../../Components/TextField'
import { formUpdate } from '../../../Action/SeminarAction'
import { connect } from 'react-redux'
import { View } from 'react-native'
import venueData from './venueData'
import MyDatePicker from '../../../Components/DatePicker'
import MyTimePicker from '../../../Components/TimePicker'
import SearchDropdown from '../../../Components/SearchableDropdown'

class UpdateAndAddForm extends Component {
  static defaultProps = {
    password: false
  }

  constructor (props) {
    super(props)
    this.state = {
      disabled: true
    }
  }

  render () {
    const { abstract, date, startTime, endTime, label, speaker, venue } = this.props
    return (
      <View>
        <TextField
          placeholder={'Abstract'}
          value={abstract}
          onChangeText={(value) => this.props.formUpdate({ prop: 'abstract', value })}
        />
        <MyDatePicker date={date} onDateChange={(value) => this.props.formUpdate({ prop: 'date', value })} />

        <MyTimePicker time={startTime} placeholder='Start Time'
          onDateChange={(value) => {
            this.props.formUpdate({ prop: 'startTime', value })
            this.setState({ disabled: false })
          }} />
        <MyTimePicker disabled={this.state.disabled} minDate={startTime} time={endTime} placeholder='End Time'
          onDateChange={(value) => this.props.formUpdate({ prop: 'endTime', value })} />
        <TextField
          placeholder={'Label'}
          value={label}
          onChangeText={(value) => this.props.formUpdate({ prop: 'label', value })}
        />
        <TextField
          placeholder={'Speaker'}
          value={speaker}
          onChangeText={(value) => this.props.formUpdate({ prop: 'speaker', value })}
        />
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
      </View>
    )
  }
}

UpdateAndAddForm.propTypes = {
  // TODO: Fix the proptypes warning
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string
}

export default connect(null, { formUpdate })(UpdateAndAddForm)
