import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../Action/SeminarAction'
import UpdateSeminarForm from './EditAndAddSeminarForm'
import RoundedButton from '../../../Components/RoundedButton'
import styles from '../../Styles/ContainerStyle'

class EditSeminar extends Component {
  onUpdatePressed () {
    const { abstract, date, time, duration, label, speaker, venue, id, seminarAttendees } = this.props
    // The actions.
    console.log(seminarAttendees.email)
    this.props.sendUpdateEmailNotif(id, seminarAttendees)
    this.props.saveSeminar({ abstract, date, time, duration, label, speaker, venue, id })
  }

  render () {
    const { abstract, date, time, duration, label, speaker, venue } = this.props

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionText}>Edit Your Seminar</Text>
        <UpdateSeminarForm
          abstract={abstract}
          date={date}
          time={time}
          duration={duration}
          label={label}
          speaker={speaker}
          venue={venue}
        />
        <RoundedButton
          text={'Update'}
          onPress={this.onUpdatePressed.bind(this)}
        />
      </ScrollView>
    )
  }
}

// the redux function.
const mapStateToProps = (state) => {
  const { abstract, date, time, duration, label, speaker, venue } = state.seminar
  const { seminarAttendees } = state.attendee
  const { id } = state.seminar.seminarSelected
  return {
    abstract, date, time, duration, label, speaker, venue, id, seminarAttendees
  }
}

export default connect(mapStateToProps, actions)(EditSeminar)
