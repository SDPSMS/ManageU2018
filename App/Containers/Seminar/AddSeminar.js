import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import AddSeminarForm from './UpdateAndAddSeminarStack/Abstract'
import styles from '../Styles/ContainerStyle'
import * as actions from '../../Action/SeminarAction'
import RoundedButton from '../../Components/RoundedButton'

class AddSeminar extends Component {

  // TODO: Create form component for add/updating seminar
  render () {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionText}>Add New Seminar</Text>
        <AddSeminarForm />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { abstract, date, time, duration, label, speaker, venue } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue
  }
}

export default connect(mapStateToProps, actions)(AddSeminar)
