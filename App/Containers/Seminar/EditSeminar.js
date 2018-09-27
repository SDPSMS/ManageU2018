import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../Action/SeminarAction'
import UpdateSeminarForm from './UpdateAndAddSeminarStack/Abstract'
import RoundedButton from '../../Components/RoundedButton'
import styles from '../Styles/ContainerStyle'

class EditSeminar extends Component {
  onUpdatePressed () {
    const { abstract, date, time, duration, label, speaker, venue, uid } = this.props
    // The actions.
    this.props.saveSeminar({ abstract, date, time, duration, label, speaker, venue, uid })
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
  const { abstract, date, time, duration, label, speaker, venue, uid } = state.seminar
  return {
    abstract, date, time, duration, label, speaker, venue, uid
  }
}

export default connect(mapStateToProps, actions)(EditSeminar)
