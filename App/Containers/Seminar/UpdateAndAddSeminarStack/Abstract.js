import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { formUpdate } from '../../../Action/SeminarAction'
import { connect } from 'react-redux'
import { View } from 'react-native'
import venueData from './venueData'
import RoundedButton from '../../../Components/RoundedButton'
import SearchDropdown from '../../../Components/SearchableDropdown'

class Abstract extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { abstract, label, speaker, venue } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
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
        <SearchDropdown
          data={venueData}
          label='Venue'
          value={venue}
          onItemSelect={(item) => {
            this.props.formUpdate({ prop: 'venue', value: item.name })
            this.props.formUpdate({ prop: 'capacity', value: item.capacity })
          }}
          onChangeText={
            (item) => {
              this.props.formUpdate({ prop: 'venue', value: item.name })
              this.props.formUpdate({ prop: 'capacity', value: item.capacity })
            }
          }
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
  const { abstract, date, time, duration, label, speaker, venue, capacity } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue, capacity
  }
}

export default connect(mapStateToProps, { formUpdate })(Abstract)
