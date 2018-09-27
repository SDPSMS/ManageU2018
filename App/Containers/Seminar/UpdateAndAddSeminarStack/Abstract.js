import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { formUpdate } from '../../../Action/SeminarAction'
import { connect } from 'react-redux'
import { View } from 'react-native'
import CustomDropdown from '../../../Components/Dropdown'
import RoundedButton from '../../../Components/RoundedButton'

class Abstract extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { abstract, label, speaker, venue } = this.props

    return (
      <View style={{marginLeft: 20, marginRight: 20}}>
        <TextField
          placeholder={'Label'}
          value={label}
          onChangeText={(value) => this.props.formUpdate({ prop: 'label', value })}
        />
        <TextField
          placeholder={'Abstract'}
          value={abstract}
          onChangeText={(value) => this.props.formUpdate({ prop: 'abstract', value })}
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
        <RoundedButton
          text={'Add'}
          onPress={() => this.props.navigation.push('DateTime')}
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

export default connect(mapStateToProps, {formUpdate})(Abstract)
