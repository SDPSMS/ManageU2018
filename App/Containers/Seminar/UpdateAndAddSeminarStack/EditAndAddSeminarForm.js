import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../../Components/TextField'
import { formUpdate } from '../../../Action/SeminarAction'
import CustomDropdown from '../../../Components/Dropdown'
import { connect } from 'react-redux'
import { View } from 'react-native'

class UpdateAndAddForm extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { abstract, date, time, duration, label, speaker, venue } = this.props

    return (
      <View>
        <TextField
          placeholder={'Abstract'}
          value={abstract}
          onChangeText={(value) => this.props.formUpdate({ prop: 'abstract', value })}
        />
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
        <CustomDropdown
          data={[{
            value: 'Banana'
          }, {
            value: 'Mango'
          }, {
            value: 'Pear'
          }]}
          label={'Venue'}
          value={venue}
          onChangeText={(value) => this.props.formUpdate({ prop: 'venue', value })}
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
