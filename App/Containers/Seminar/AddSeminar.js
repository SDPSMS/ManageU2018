import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import AddSeminarForm from './UpdateAndAddSeminarForm'
import styles from '../Styles/ContainerStyle'
import * as actions from '../../Action/SeminarAction'
import RoundedButton from '../../Components/RoundedButton'

class AddSeminar extends Component {
  onAddPressed () {
    const { abstract, date, time, duration, label, speaker, venue } = this.props
    // The actions.
    this.props.addNewSeminar({ abstract, date, time, duration, label, speaker, venue })
  }

  // TODO: Create form component for add/updating seminar
  render () {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionText}>Add New Seminar</Text>
        <AddSeminarForm />
        <RoundedButton
          text={'Add'}
          onPress={this.onAddPressed.bind(this)}
        />
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
