import React, { Component } from 'react'
import TextField from '../../../Components/TextField'
import { formUpdate } from '../../../Action/SeminarAction'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import venueData from './venueData'
import RoundedButton from '../../../Components/RoundedButton'
import SearchDropdown from '../../../Components/SearchableDropdown'
import BackButton from '../../../Components/BackButton'
import styles from '../../Styles/ContainerStyle'
import TextFieldLarge from '../../../Components/TextFieldLarge'

class Abstract extends Component {
  render () {
    const { abstract, label, speaker, venue } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <BackButton onPress={() => this.props.navigation.pop()} />
        <Text style={styles.sectionText}>Add new Seminar</Text>
        <TextField
          placeholder={'Label'}
          value={label}
          onChangeText={(value) => this.props.formUpdate({ prop: 'label', value })}
        />
        <TextFieldLarge
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
            this.props.formUpdate({ prop: 'venueCapacity', value: item.capacity })
          }}
          onChangeText={
            (item) => {
              this.props.formUpdate({ prop: 'venue', value: item.name })
              this.props.formUpdate({ prop: 'venueCapacity', value: item.capacity })
            }
          }
        />
        <RoundedButton
          text={'Continue'}
          onPress={() => this.props.navigation.push('DateTime')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, time, duration, label, speaker, venue, venueCapacity } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue, venueCapacity
  }
}

export default connect(mapStateToProps, { formUpdate })(Abstract)
