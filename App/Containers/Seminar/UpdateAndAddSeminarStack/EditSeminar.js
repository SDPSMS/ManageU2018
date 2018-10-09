import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../Action/SeminarAction'
import UpdateSeminarForm from './EditAndAddSeminarForm'
import RoundedButton from '../../../Components/RoundedButton'
import styles from '../../Styles/ContainerStyle'

class EditSeminar extends Component {
  onUpdatePressed () {
    const { abstract, date, startTime, endTime, label, speaker, venue, id } = this.props
    // The actions.
    this.props.sendUpdateEmailNotif(id)
    this.props.saveSeminar({ abstract, date, startTime, endTime, label, speaker, venue, id })
  }

  render () {
    const { abstract, date, startTime, endTime, label, speaker, venue } = this.props

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionText}>Edit Your Seminar</Text>
        <UpdateSeminarForm
          abstract={abstract}
          date={date}
          startTime={startTime}
          endTime={endTime}
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
  const { abstract, date, startTime, endTime, label, speaker, venue } = state.seminar
  const { id } = state.seminar.seminarSelected
  return {
    abstract, date, startTime, endTime, label, speaker, venue, id
  }
}

export default connect(mapStateToProps, actions)(EditSeminar)
