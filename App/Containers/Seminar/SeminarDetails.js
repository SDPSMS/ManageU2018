import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { editSeminar, deleteSeminar, unselectSeminar, loadAttendees } from '../../Action/SeminarAction'
import { attendSeminar } from '../../Action/AttendeeAction'
import ModalDialog from '../../Components/ModalDialog'
import RoundedButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'
import styles from '../Styles/ContainerStyle'

class SeminarDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      name: '',
      email: ''
    }
  }

  attendSeminar () {
    console.log(this.props.seminar.id)
    this.props.attendSeminar(this.state.name, this.state.email, this.props.seminar.id)
    this.setState({ showModal: false })
  }

  renderOrganiserOnlyContent () {
    const { user } = this.props
    if (this.props.user != null) {
      if (user.role === 'Organiser' || user.role === 'Host') {
        return (
          <View>
            <SimpleIcon
              name={'settings'}
              size={30}
              onPress={() => this.props.editSeminar(this.props.seminar)}
            />

            <SimpleIcon
              name={'minus'}
              size={30}
              onPress={() => this.props.deleteSeminar(this.props.seminar.id)}
            />
            <Button title='Display Attendees' onPress={() => this.props.loadAttendees(this.props.seminar.id)} />
          </View>
        )
      }
    }
  }

  // TODO: The Display attendees button should not have that function when clicked (should only move the screen).
  renderDetails () {
    let dialogContent = (
      <View>
        <TextField
          placeholder={'Name'}
          onChangeText={(value) => this.setState({ name: value })}
        />
        <TextField
          placeholder={'Email'}
          onChangeText={(value) => this.setState({ email: value })}
        />
      </View>
    )

    return (
      <View style={ styles.container } >
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.unselectSeminar()}
        />
        {this.renderOrganiserOnlyContent()}

        {/* Title of Seminar */}
        <Text style={ styles.titleText }>{this.props.seminar.label}</Text>

        
        {/* Seminar details */}
        <Text style={ styles.sectionText }>Duration</Text>
        <Text>{this.props.seminar.duration}</Text>

        <Text style={ styles.sectionText }>Speaker</Text>
        <Text>{this.props.seminar.speaker}</Text>

        {/* TODO: Insert dividers between different sections.
          Look to use a table view or equivalent for seminar
          details*/}

        {/* Seminar date */}
        <Text style={ styles.sectionText }>Date</Text>
        <Text>{this.props.seminar.date}</Text>
        {/* Seminar time */}
        <Text style={ styles.sectionText }>Time</Text>
        <Text>{this.props.seminar.time}</Text>

        <Text style={ styles.sectionText }>Venue</Text>
        <Text>{this.props.seminar.venue}</Text>

        {/* Abstract text */}
        <Text style={ styles.sectionText }>Abstract</Text>
        <Text>{this.props.seminar.abstract}</Text>


        <View>
          <RoundedButton text='Join' onPress={() => this.setState({ showModal: true })} />
        </View>
        <ModalDialog
          onPressPositive={() => this.attendSeminar()}
          onPressNegative={() => this.setState({ showModal: false })} children={dialogContent}
          title='Join a Seminar' isVisible={this.state.showModal} />
      </View>
    )
  }

  render () {
    return (
      <View>
        {this.renderDetails()}
      </View>
    )
  }
}

SeminarDetails.propTypes = {
  seminar: PropTypes.object,
  unselectSeminar: PropTypes.func.isRequired
}

const
  mapStateToProps = (state) => {
    return {
      seminar: state.seminar.seminarSelected,
      user: state.user.user
    }
  }

export default connect(mapStateToProps, {
  editSeminar,
  deleteSeminar,
  unselectSeminar,
  loadAttendees,
  attendSeminar
})(SeminarDetails)
