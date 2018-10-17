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

class AbstractEdit extends Component {
  render () {
    const { abstract, label, speaker, ownername, host } = this.props

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }} >
        <BackButton onPress={() => this.props.navigation.pop()} />
        <Text style={styles.sectionText}>Edit Your Seminar</Text>
        <TextField
          placeholder={'Seminar Title'}
          value={label}
          onChangeText={(value) => this.props.formUpdate({ prop: 'label', value })}
        />
        <TextField
          placeholder={'Speaker'}
          value={speaker}
          onChangeText={(value) => this.props.formUpdate({ prop: 'speaker', value })}
        />
        <TextFieldLarge
          placeholder={'Speaker Bio'}
          value={abstract}
          onChangeText={(value) => this.props.formUpdate({ prop: 'abstract', value })}
        />
        <TextField
          placeholder={'Host'}
          value={host}
          onChangeText={(value) => this.props.formUpdate({ prop: 'host', value })}
        />
        <TextField
          placeholder={'Organiser Name'}
          value={ownername}
          onChangeText={(value) => this.props.formUpdate({ prop: 'ownername', value })}
        />
        <RoundedButton
          text={'Continue'}
          onPress={() => this.props.navigation.push('DateTimeEdit')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, time, duration, label, speaker, venue, capacity, ownername, host } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue, capacity, ownername, host
  }
}

export default connect(mapStateToProps, { formUpdate })(AbstractEdit)
